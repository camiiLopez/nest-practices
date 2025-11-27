import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: 'order_item'})
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    productId: number;

    @Column('int')
    quantity: number;

    @Column('float')
    price: number;

    @ManyToOne(
        () => Order,
        order => order.items,
        { onDelete: 'CASCADE' })
    order: Order
}