import { Controller } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderStatus } from "./enums/order-status.enum";
import { OrderPaginationDto } from "./dto/order-pagination.dto";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    console.log(orderPaginationDto.status)
    return this.ordersService.findAll(orderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: string ) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() payload : { id: string, status: OrderStatus}){
    let { id, status } = payload
    return this.ordersService.changeStatus(id, status);
  }
}