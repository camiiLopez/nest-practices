import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'product_images'})
export class ProductImage{
    @ApiProperty({
            example: '05375ab4-bcac-4c19-969a-7fc19b24296d',
            description: 'Image ID',
            uniqueItems: true,
        })
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ApiProperty({
        example: '5645680-00-A_0_2000.jpg',
        description: 'Image url',
    })
    @Column('text')
    url: string;

    @ManyToOne(
        () => Product,
        product => product.images,
        { onDelete: 'CASCADE'}
    )
    product: Product
}