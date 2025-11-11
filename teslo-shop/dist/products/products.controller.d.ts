import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
    update(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: string): Promise<void>;
}
