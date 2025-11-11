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
exports.ProductImage = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const swagger_1 = require("@nestjs/swagger");
let ProductImage = class ProductImage {
};
exports.ProductImage = ProductImage;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '05375ab4-bcac-4c19-969a-7fc19b24296d',
        description: 'Image ID',
        uniqueItems: true,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], ProductImage.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '5645680-00-A_0_2000.jpg',
        description: 'Image url',
    }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ProductImage.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.images, { onDelete: 'CASCADE' }),
    __metadata("design:type", product_entity_1.Product)
], ProductImage.prototype, "product", void 0);
exports.ProductImage = ProductImage = __decorate([
    (0, typeorm_1.Entity)({ name: 'product_images' })
], ProductImage);
//# sourceMappingURL=product-image.entity.js.map