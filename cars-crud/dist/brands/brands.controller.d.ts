import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    create(createBrandDto: CreateBrandDto): void;
    findAll(): import("./entities/brand.entity").Brand[];
    findOne(id: string): import("./entities/brand.entity").Brand;
    update(id: string, updateBrandDto: UpdateBrandDto): import("./entities/brand.entity").Brand;
    remove(id: string): void;
}
