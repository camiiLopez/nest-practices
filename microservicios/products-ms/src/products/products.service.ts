import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this.productRepository.findAndCount({
      where: { available: true },
      skip: (page - 1) * limit,
      take: limit,
    });

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: { total, page, lastPage },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        available: true
      }
    })

    if (!product) throw new RpcException({
      message: `Product with ID ${id} not found`,
      statusCode: HttpStatus.BAD_REQUEST,
      error: "Bad request"
    });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.productRepository.update({ id: id }, updateProductDto);
  }

  async hardRemove(id: number) {
    await this.findOne(id);

    return await this.productRepository.delete({ id })
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.productRepository.update(
      { id },
      { available: false },
    );

    return this.productRepository.findOne({ where: { id } });
  }

  async validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids));

    const products = await this.productRepository.find({
      where: { id: In(ids), available: true }
    });

    if (products.length != ids.length) {
      throw new RpcException({
        message: `Some products were not found`,
        statusCode: HttpStatus.NOT_FOUND,
        error: "Not found"
      })
    }
    return products;
  }
}
