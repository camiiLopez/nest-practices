import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    TypeOrmModule.forRoot({
       type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT! ?? 5432, 10),
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true
    }),
    OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
