import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CarsService {

  private cars: Car[] = []

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: randomUUID(),
      brand: createCarDto.brand,
      model: createCarDto.model
    }

    this.cars.push(car);
  }

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find(car => car.id === id)

    if (!car) throw new NotFoundException(`Car with id ${id} not found`)

    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);

    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto }
        return carDB;
      }
      return car;
    })
    return carDB;
  }

  remove(id: string) {
    this.cars = this.cars.filter(car => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
