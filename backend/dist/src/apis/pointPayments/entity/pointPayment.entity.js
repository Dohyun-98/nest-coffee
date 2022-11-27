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
exports.PointPayment = exports.POINT_PAYMENT_STATUS_ENUM = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entity/user.entity");
const typeorm_1 = require("typeorm");
var POINT_PAYMENT_STATUS_ENUM;
(function (POINT_PAYMENT_STATUS_ENUM) {
    POINT_PAYMENT_STATUS_ENUM["PAYMENT"] = "PAYMENT";
    POINT_PAYMENT_STATUS_ENUM["CANCEL"] = "CANCEL";
})(POINT_PAYMENT_STATUS_ENUM = exports.POINT_PAYMENT_STATUS_ENUM || (exports.POINT_PAYMENT_STATUS_ENUM = {}));
(0, graphql_1.registerEnumType)(POINT_PAYMENT_STATUS_ENUM, {
    name: 'POINT_PAYMENT_STATUS_ENUM',
});
let PointPayment = class PointPayment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PointPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30 }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], PointPayment.prototype, "impUid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PointPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], PointPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: POINT_PAYMENT_STATUS_ENUM }),
    (0, graphql_1.Field)(() => POINT_PAYMENT_STATUS_ENUM, { nullable: true }),
    __metadata("design:type", String)
], PointPayment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], PointPayment.prototype, "user", void 0);
PointPayment = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], PointPayment);
exports.PointPayment = PointPayment;
//# sourceMappingURL=pointPayment.entity.js.map