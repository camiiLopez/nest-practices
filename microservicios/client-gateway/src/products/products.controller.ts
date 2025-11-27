import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { log } from 'console';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    //OBSERVABLE
    console.log(id)
    return this.productsClient.send({ cmd: 'find_one_product' }, { id: Number(id) })
      .pipe(
        catchError(err => {
          console.log(JSON.stringify(err, null, 2));

          throw new RpcException(err) })
      );

    //PROMESA
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id })
    //   )

    //   return product;

    // } catch (error) {
    //   throw new RpcException(error)
    // }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto) {
    return this.productsClient.send({ cmd: 'update_product' }, { id: Number(id), ...updateProductDto })
    .pipe(
      catchError(err => { throw new RpcException(err)})
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id: Number(id) });
  }

}
