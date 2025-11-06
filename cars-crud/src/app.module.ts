import { Module } from '@nestjs/common';
import { BrandsModule } from './brands/brands.module';
import { SeedModule } from './seed/seed.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [BrandsModule, SeedModule, CarsModule],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
