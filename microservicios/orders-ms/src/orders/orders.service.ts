import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { OrderStatus } from './enums/order-status.enum';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(order);

    return order;
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { limit = 10, page = 0, status } = orderPaginationDto;

    const totalPages = await this.orderRepository.count({
      where: { status: status as OrderStatus  }
    })
    return { data: await this.orderRepository.find({
      take: limit,
      skip: page,
      where: status  ? { status } : {},
    }),
    meta: {
      total: totalPages,
      page: page,
      lastPage: Math.ceil(totalPages / limit)
    }}
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id: id });

    if (!order) throw new RpcException({
      message: `Order with ID ${id} not found`,
      status: HttpStatus.BAD_REQUEST
    });

    return order;
  }

  async changeStatus(id: string, status: OrderStatus) {
    const order = await this.orderRepository.preload({
      id,
      status,
    });

    if(order?.status == status) return order;

    if (!order) throw new RpcException({
      message: `Order with ID ${id} not found`,
      status: HttpStatus.BAD_REQUEST
    });

    return this.orderRepository.save(order);

  }
}
