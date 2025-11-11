import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({
        example: '05375ab4-bcac-4c19-969a-7fc19b24296d',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'White t-shirt',
        description: 'Product description',
        nullable: true
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't-shirt_teslo',
        description: 'Product slug',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 0,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        type: [String],
        example: ['XS', 'S', 'M'],
        description: 'Product sizes',
        default: []
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        type: [String],
        example: ['men', 'women', 'unisex'],
        description: 'Product gender',
        default: []
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['t-shirt', 'white'],
        description: 'Product tags',
        default: []
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({
        type: [ProductImage],
        description: 'Product images',
        default: [{ url: 'https://teslo-shop.com/images/product-1.jpg' },]
    })
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true },
    )
    images?: ProductImage[]

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug.toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[']+/g, "");
    }
}
