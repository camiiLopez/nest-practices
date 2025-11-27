import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RpcException } from '@nestjs/microservices';
import { error } from 'console';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService')

  constructor(private prisma: PrismaService) {
    this.logger.log('Database connected')
  }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.prisma.product.count({ where: { available: true }});
    const lastPage = Math.ceil(totalPages / limit!);

    return {
      data: await this.prisma.product.findMany({
        skip: (page! - 1) * limit!,
        take: limit,
        where: { available:  true }
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id: id, available: true }
    });

    if (!product) throw new RpcException({ 
      message: `Product with ID ${id} not found`, 
      statusCode: HttpStatus.BAD_REQUEST,
      error: "Bad request"
    });

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: __, ...data} = updateProductDto;

    await this.findOne(id);

    return this.prisma.product.update({
      where: { id: id },
      data: data
    })
  }

  async hardRemove(id: number){
    await this.findOne(id);

    return await this.prisma.product.delete({
      where: { id: id }
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    const product = await this.prisma.product.update({
      where: { id : id },
      data: { available: false }
    })

    return product;
  }

  async validateProducts(ids: number[]){
    ids = Array.from(new Set(ids));

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: ids
        },
        available: true
      }
    });

    if(products.length != ids.length){
      throw new RpcException({
        message: `Some products were not found`, 
        statusCode: HttpStatus.NOT_FOUND,
        error: "Not found"
      })
    }
    return products;
  }
}
