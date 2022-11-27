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
exports.UserCouponResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../users/users.service");
const userCoupon_entity_1 = require("./entity/userCoupon.entity");
const userCoupon_service_1 = require("./userCoupon.service");
let UserCouponResolver = class UserCouponResolver {
    constructor(userCouponService, usersService) {
        this.userCouponService = userCouponService;
        this.usersService = usersService;
    }
    findCoupon(id) {
        return this.userCouponService.findWithId({ id });
    }
    createUserCoupon(userId, price) {
        const user = this.usersService.findWithId({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException('not found user');
        }
        return this.userCouponService.create({ userId, price });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [userCoupon_entity_1.UserCoupon]),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserCouponResolver.prototype, "findCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => userCoupon_entity_1.UserCoupon),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('price')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], UserCouponResolver.prototype, "createUserCoupon", null);
UserCouponResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [userCoupon_service_1.UserCouponService,
        users_service_1.UsersService])
], UserCouponResolver);
exports.UserCouponResolver = UserCouponResolver;
//# sourceMappingURL=userCoupon.resolver.js.map