import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
export declare class SeedService {
    private readonly brandsService;
    private readonly carsService;
    constructor(brandsService: BrandsService, carsService: CarsService);
    populateDB(): string;
}
