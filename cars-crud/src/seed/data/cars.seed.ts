import { randomUUID } from "crypto";
import { Car } from "src/cars/entities/car.entity";

export const CARS_SEED : Car[] = [
    { id: randomUUID(), model: 'Corolla', brand: 'Toyota'},
    { id: randomUUID(), model: 'Civic', brand: 'Honda'},
    { id: randomUUID(), model: 'Cherokee', brand: 'Jeep'}
]