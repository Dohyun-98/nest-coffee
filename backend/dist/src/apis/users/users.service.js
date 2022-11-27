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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        const result = await this.usersRepository.find();
        if (result.length <= 0) {
            throw new common_1.UnprocessableEntityException('No users found');
        }
        return result;
    }
    async findOne({ email }) {
        return await this.usersRepository.findOne({ where: { email } });
    }
    async findWithId({ id }) {
        return await this.usersRepository.find({ where: { id } });
    }
    async findWithDeleted({ email }) {
        return await this.usersRepository.findOne({
            withDeleted: true,
            where: { email },
        });
    }
    async create({ createUserInput }) {
        const user = await this.usersRepository.findOne({
            where: { email: createUserInput.email },
        });
        if (user) {
            throw new common_1.UnprocessableEntityException('User already exists');
        }
        console.log(createUserInput.password);
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        return this.usersRepository.save(Object.assign(Object.assign({}, createUserInput), { password: hashedPassword }));
    }
    async update({ email, updateUserInput }) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnprocessableEntityException('User does not exist');
        }
        const result = await this.usersRepository.save(Object.assign(Object.assign({}, user), updateUserInput));
        return result ? true : false;
    }
    async delete({ email }) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnprocessableEntityException('User does not exist');
        }
        const result = await this.usersRepository.softDelete({ email });
        return result.affected ? true : false;
    }
    async restore({ email }) {
        const user = await this.usersRepository.findOne({
            withDeleted: true,
            where: { email },
        });
        if (!user) {
            throw new common_1.UnprocessableEntityException('User does not exist');
        }
        const result = await this.usersRepository.restore({ email });
        return result.affected ? true : false;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map