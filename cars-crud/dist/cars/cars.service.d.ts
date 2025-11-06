import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
export declare class CarsService {
    private cars;
    create(createCarDto: CreateCarDto): void;
    findAll(): Car[];
    findOne(id: string): Car;
    update(id: string, updateCarDto: UpdateCarDto): Car;
    remove(id: string): void;
    fillCarsWithSeedData(cars: Car[]): void;
}
