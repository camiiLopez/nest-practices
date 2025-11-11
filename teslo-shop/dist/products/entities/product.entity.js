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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const product_image_entity_1 = require("./product-image.entity");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product {
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.slug = this.slug.toLowerCase()
            .replaceAll(" ", "_")
            .replaceAll("'", "");
    }
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[']+/g, "");
    }
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '05375ab4-bcac-4c19-969a-7fc19b24296d',
        description: 'Product ID',
        uniqueItems: true
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'T-shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)('text', {
        unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Product price',
    }),
    (0, typeorm_1.Column)('float', {
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'White t-shirt',
        description: 'Product description',
        nullable: true
    }),
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 't-shirt_teslo',
        description: 'Product slug',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)('text', {
        unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Product stock',
        default: 0
    }),
    (0, typeorm_1.Column)('int', {
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['XS', 'S', 'M'],
        description: 'Product sizes',
        default: []
    }),
    (0, typeorm_1.Column)('text', {
        array: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['men', 'women', 'unisex'],
        description: 'Product gender',
        default: []
    }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['t-shirt', 'white'],
        description: 'Product tags',
        default: []
    }),
    (0, typeorm_1.Column)('text', {
        array: true,
        default: []
    }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [product_image_entity_1.ProductImage],
        description: 'Product images',
        default: [{ url: 'https://teslo-shop.com/images/product-1.jpg' },]
    }),
    (0, typeorm_1.OneToMany)(() => product_image_entity_1.ProductImage, productImage => productImage.product, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "checkSlugInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "checkSlugUpdate", null);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Product);
//# sourceMappingURL=product.entity.js.map