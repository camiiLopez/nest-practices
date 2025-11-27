import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderItem } from "./order-item";

@Entity({ name: 'order'})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  totalAmount: number

  @Column('int')
  totalItems: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: true })
  paidAt?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(
    () => OrderItem,
    orderItem => orderItem.order,
    { cascade: true})
  items: OrderItem[]
}
