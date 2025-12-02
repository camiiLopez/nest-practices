import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE, } from 'src/config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
          {
            name: ORDER_SERVICE,
            transport: Transport.NATS,
            options: {
              // host: envs.ordersMicroserviceHost,
              // port: envs.ordersMicroservicePort
              servers: envs.natsServers.split(',')
            }
          }
        ])
  ],
})
export class OrdersModule {}
