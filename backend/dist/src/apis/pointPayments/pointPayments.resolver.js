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
exports.PointPaymentsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../../../common/auth/gql-auth.guard");
const gql_user_parm_1 = require("../../../common/auth/gql-user.parm");
const iamport_service_1 = require("../iamport/iamport.service");
const pointPayment_entity_1 = require("./entity/pointPayment.entity");
const pointPayments_service_1 = require("./pointPayments.service");
let PointPaymentsResolver = class PointPaymentsResolver {
    constructor(pointPaymentsService, iamportService) {
        this.pointPaymentsService = pointPaymentsService;
        this.iamportService = iamportService;
    }
    async createPointPayment(impUid, amount, user) {
        const access_token = await this.iamportService.getAccessToken();
        await this.iamportService.checkPaid({ impUid, access_token, amount });
        await this.pointPaymentsService.isPaidDuplicate({ impUid });
        return this.pointPaymentsService.create({
            impUid,
            amount,
            user,
            status: pointPayment_entity_1.POINT_PAYMENT_STATUS_ENUM.PAYMENT,
        });
    }
    async cancelPointPayment(impUid, amount, reason, user) {
        await this.pointPaymentsService.isCancelDuplicate({ impUid });
        const access_token = await this.iamportService.getAccessToken();
        await this.iamportService.checkCancel({
            impUid,
            access_token,
            amount,
        });
        await this.iamportService.cancel({
            impUid,
            access_token,
            reason,
        });
        const cancel = await this.pointPaymentsService.cancel({
            impUid,
            amount,
            user,
            status: pointPayment_entity_1.POINT_PAYMENT_STATUS_ENUM.CANCEL,
        });
        return cancel;
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => pointPayment_entity_1.PointPayment),
    __param(0, (0, graphql_1.Args)('impUid')),
    __param(1, (0, graphql_1.Args)({ name: 'amount', type: () => graphql_1.Int })),
    __param(2, (0, gql_user_parm_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PointPaymentsResolver.prototype, "createPointPayment", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => pointPayment_entity_1.PointPayment),
    __param(0, (0, graphql_1.Args)('impUid')),
    __param(1, (0, graphql_1.Args)({ name: 'amount', type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)({ name: 'reason', type: () => String })),
    __param(3, (0, gql_user_parm_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], PointPaymentsResolver.prototype, "cancelPointPayment", null);
PointPaymentsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pointPayments_service_1.PointPaymentsService,
        iamport_service_1.IamportService])
], PointPaymentsResolver);
exports.PointPaymentsResolver = PointPaymentsResolver;
//# sourceMappingURL=pointPayments.resolver.js.map