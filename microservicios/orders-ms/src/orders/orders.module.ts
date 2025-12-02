import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'process';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ClientsModule.register([
      {
        name: 'PRODUCTS_MICROSERVICE',
        transport: Transport.NATS,
        options: {
          // host: process.env.PRODUCTS_MICROSERVICE_HOST,
          // port: +process.env.PRODUCTS_MICROSERVICE_PORT! || 3001
          servers: env.NATS_SERVERS?.split(',')
        }
      }
    ])
  ]
})
export class OrdersModule {}
