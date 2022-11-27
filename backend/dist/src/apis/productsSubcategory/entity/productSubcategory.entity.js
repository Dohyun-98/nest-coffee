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
exports.ProductSubcategory = void 0;
const graphql_1 = require("@nestjs/graphql");
const productMaincategory_entity_1 = require("../../productsMaincategory/entity/productMaincategory.entity");
const typeorm_1 = require("typeorm");
let ProductSubcategory = class ProductSubcategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ProductSubcategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ProductSubcategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productMaincategory_entity_1.ProductMaincategory),
    (0, graphql_1.Field)(() => productMaincategory_entity_1.ProductMaincategory),
    __metadata("design:type", productMaincategory_entity_1.ProductMaincategory)
], ProductSubcategory.prototype, "productMaincategory", void 0);
ProductSubcategory = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], ProductSubcategory);
exports.ProductSubcategory = ProductSubcategory;
//# sourceMappingURL=productSubcategory.entity.js.map