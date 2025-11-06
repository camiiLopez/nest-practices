import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    create(createCarDto: CreateCarDto): void;
    findAll(): import("./entities/car.entity").Car[];
    findOne(id: string): import("./entities/car.entity").Car;
    update(id: string, updateCarDto: UpdateCarDto): import("./entities/car.entity").Car;
    remove(id: string): void;
}
