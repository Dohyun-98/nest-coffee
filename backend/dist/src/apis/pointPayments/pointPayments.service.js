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
exports.PointPaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entity/user.entity");
const pointPayment_entity_1 = require("./entity/pointPayment.entity");
let PointPaymentsService = class PointPaymentsService {
    constructor(userRepository, pointPaymentRepository, dataSource) {
        this.userRepository = userRepository;
        this.pointPaymentRepository = pointPaymentRepository;
        this.dataSource = dataSource;
    }
    async create({ impUid, amount, user: _user, status }) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction('SERIALIZABLE');
            const pointPayment = await this.pointPaymentRepository.create({
                impUid: impUid,
                amount,
                user: _user,
                status,
            });
            const result = await queryRunner.manager.save(pointPayment);
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                lock: { mode: 'pessimistic_write' },
                where: { id: _user.id },
            });
            await queryRunner.manager.save(user_entity_1.User, Object.assign(Object.assign({}, user), { point: user.point + amount }));
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async isPaidDuplicate({ impUid }) {
        const result = await this.pointPaymentRepository.findOne({
            where: { impUid, status: pointPayment_entity_1.POINT_PAYMENT_STATUS_ENUM.PAYMENT },
        });
        if (result) {
            throw new common_1.ConflictException('already exist payment data');
        }
    }
    async isCancelDuplicate({ impUid }) {
        const result = await this.pointPaymentRepository.findOne({
            where: { impUid, status: pointPayment_entity_1.POINT_PAYMENT_STATUS_ENUM.CANCEL },
        });
        if (result) {
            throw new common_1.ConflictException('already exist cancel payment data');
        }
    }
    async cancel({ impUid, amount, user: _user, status }) {
        return await this.create({ impUid, amount: -amount, user: _user, status });
    }
};
PointPaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(pointPayment_entity_1.PointPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PointPaymentsService);
exports.PointPaymentsService = PointPaymentsService;
//# sourceMappingURL=pointPayments.service.js.map