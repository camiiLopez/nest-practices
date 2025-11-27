import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderStatus } from './enums/order-status.enum';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { OrderItem } from './entities/order-item';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @Inject('PRODUCTS_MICROSERVICE')
    private readonly productsClient: ClientProxy
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      let productsIds = createOrderDto.items.map(item => item.productId);

      const products = await firstValueFrom(
        this.productsClient.send({ cmd: 'validate_products' }, productsIds));

      const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
        const price = products.find(
          product => product.id === orderItem.productId
        ).price;

        return price * orderItem.quantity;

      }, 0)

      const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      const order = this.orderRepository.create({
        totalAmount,
        totalItems,
        items: createOrderDto.items.map(item => {
          const product = products.find(p => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product.price
          };
        })
      });

      await this.orderRepository.save(order);

      return order;

    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: "Check logs"
      });
    }
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { limit = 10, page = 0, status } = orderPaginationDto;

    const totalPages = await this.orderRepository.count({
      where: { status: status as OrderStatus }
    })
    return {
      data: await this.orderRepository.find({
        take: limit,
        skip: page,
        where: status ? { status } : {},
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: Math.ceil(totalPages / limit)
      }
    }
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['items']
    });

    if (!order) throw new RpcException({
      message: `Order with ID ${id} not found`,
      status: HttpStatus.BAD_REQUEST
    });

    const productsIds = order.items.map(o => o.productId)

    const products: any[] = await firstValueFrom(
      this.productsClient.send({ cmd: 'validate_products' }, productsIds)
    )

    order.items = order.items.map((orderItem) => ({
      ...orderItem,
      name: products.find((product) => product.id === orderItem.productId)?.name,
    }));

    return order;
  }

  async changeStatus(id: string, status: OrderStatus) {
    const order = await this.orderRepository.preload({
      id,
      status,
    });

    if (order?.status == status) return order;

    if (!order) throw new RpcException({
      message: `Order with ID ${id} not found`,
      status: HttpStatus.BAD_REQUEST
    });

    return this.orderRepository.save(order);

  }
}
