import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderStatus } from './enums/order-status.enum';
import { OrderPaginationDto } from './dto/order-pagination.dto.ts';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient : ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    const {limit = 10, page = 1, status} = orderPaginationDto;
    return this.ordersClient.send('findAllOrders', {limit, page, status});
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', id)
    .pipe(
       catchError(err => { throw new RpcException(err) })
    )
  }

  @Patch(':id/:status')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Param('status') status: OrderStatus) {
    return this.ordersClient.send('changeOrderStatus', { id, status})
  }
}
