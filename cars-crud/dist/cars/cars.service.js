"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let CarsService = class CarsService {
    cars = [];
    create(createCarDto) {
        const car = {
            id: (0, crypto_1.randomUUID)(),
            brand: createCarDto.brand,
            model: createCarDto.model
        };
        this.cars.push(car);
    }
    findAll() {
        return this.cars;
    }
    findOne(id) {
        const car = this.cars.find(car => car.id === id);
        if (!car)
            throw new common_1.NotFoundException(`Car with id ${id} not found`);
        return car;
    }
    update(id, updateCarDto) {
        let carDB = this.findOne(id);
        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto };
                return carDB;
            }
            return car;
        });
        return carDB;
    }
    remove(id) {
        this.cars = this.cars.filter(car => car.id !== id);
    }
    fillCarsWithSeedData(cars) {
        this.cars = cars;
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)()
], CarsService);
//# sourceMappingURL=cars.service.js.map