import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductImage } from './entities/product-image.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly imageRepository;
    private readonly dataSource;
    private readonly logger;
    constructor(productRepository: Repository<Product>, imageRepository: Repository<ProductImage>, dataSource: DataSource);
    create(createProductDto: CreateProductDto): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
    }[]>;
    findOne(term: string): Promise<any>;
    findOnePlain(term: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: string): Promise<void>;
    private handleDBExceptions;
    deleteAllProducts(): Promise<import("typeorm").DeleteResult>;
}
