"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const brands_service_1 = require("../brands/brands.service");
const brands_seed_1 = require("./data/brands.seed");
const cars_service_1 = require("../cars/cars.service");
const cars_seed_1 = require("./data/cars.seed");
let SeedService = class SeedService {
    brandsService;
    carsService;
    constructor(brandsService, carsService) {
        this.brandsService = brandsService;
        this.carsService = carsService;
    }
    populateDB() {
        this.brandsService.fillBrandsWithSeedData(brands_seed_1.BRANDS_SEED);
        this.carsService.fillCarsWithSeedData(cars_seed_1.CARS_SEED);
        return 'SEED executed';
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brands_service_1.BrandsService,
        cars_service_1.CarsService])
], SeedService);
//# sourceMappingURL=seed.service.js.map