"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointPaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const iamport_service_1 = require("../iamport/iamport.service");
const user_entity_1 = require("../users/entity/user.entity");
const users_service_1 = require("../users/users.service");
const pointPayment_entity_1 = require("./entity/pointPayment.entity");
const pointPayments_resolver_1 = require("./pointPayments.resolver");
const pointPayments_service_1 = require("./pointPayments.service");
let PointPaymentsModule = class PointPaymentsModule {
};
PointPaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pointPayment_entity_1.PointPayment, user_entity_1.User])],
        providers: [
            pointPayments_resolver_1.PointPaymentsResolver,
            pointPayments_service_1.PointPaymentsService,
            users_service_1.UsersService,
            iamport_service_1.IamportService,
        ],
    })
], PointPaymentsModule);
exports.PointPaymentsModule = PointPaymentsModule;
//# sourceMappingURL=pointPayments.module.js.map