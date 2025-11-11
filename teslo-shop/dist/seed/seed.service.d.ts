import { ProductsService } from 'src/products/products.service';
export declare class SeedService {
    private readonly productsService;
    constructor(productsService: ProductsService);
    runSeed(): Promise<string>;
    insertNewProducts(): Promise<boolean>;
}
