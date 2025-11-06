import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class BrandsService {

  private brands : Brand[] = []

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: randomUUID(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id)

    if(!brand) throw new NotFoundException(`Brand with id ${ id } not found`)

      return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map(brand =>{
      if(brand.id === id){
        brandDB = {...brandDB, ...updateBrandDto},
        brandDB.updatedAt = new Date().getTime()
        return brandDB;
      }
      return brand;
    })
    return brandDB;
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  fillBrandsWithSeedData(brands : Brand[]){
    this.brands = brands;
  }
}
