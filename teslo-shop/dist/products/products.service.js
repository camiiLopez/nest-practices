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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const uuid_1 = require("uuid");
const product_image_entity_1 = require("./entities/product-image.entity");
let ProductsService = class ProductsService {
    constructor(productRepository, imageRepository, dataSource) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('ProductsService');
    }
    async create(createProductDto) {
        try {
            const { images = [], ...productDetails } = createProductDto;
            const product = this.productRepository.create({
                ...productDetails,
                images: images.map(img => this.imageRepository.create({ url: img })),
            });
            await this.productRepository.save(product);
            return { ...product, images };
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const products = (await this.productRepository.find({
            take: limit,
            skip: offset,
        }));
        return products.map(({ images, ...rest }) => ({
            ...rest,
            images: images.map(img => img.url)
        }));
    }
    async findOne(term) {
        let product;
        if ((0, uuid_1.validate)(term)) {
            product = await this.productRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.productRepository.createQueryBuilder('prod');
            product = await queryBuilder.where(`UPPER(title) =:title or slug =:slug`, {
                title: term.toUpperCase(),
                slug: term.toLowerCase()
            }).leftJoinAndSelect('prod.images', 'prodImages')
                .getOne();
        }
        if (!product)
            throw new common_1.NotFoundException(`Product not found`);
        return product;
    }
    async findOnePlain(term) {
        const { images = [], ...rest } = await this.findOne(term);
        return {
            ...rest,
            images: images.map(img => img.url)
        };
    }
    async update(id, updateProductDto) {
        const { images = [], ...toUpdate } = updateProductDto;
        const product = await this.productRepository.preload({
            id,
            ...toUpdate,
            images: []
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (images) {
                await queryRunner.manager.delete(product_image_entity_1.ProductImage, { product: { id } });
                product.images = images.map(img => this.imageRepository.create({ url: img }));
            }
            await queryRunner.manager.save(product);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return this.findOnePlain(id);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        await this.findOne(id);
        await this.productRepository.delete(id);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, check logs');
    }
    async deleteAllProducts() {
        const query = this.productRepository.createQueryBuilder('product');
        try {
            return await query
                .delete()
                .where({})
                .execute();
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ProductsService);
//# sourceMappingURL=products.service.js.map