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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../../../common/auth/gql-auth.guard");
const gql_user_parm_1 = require("../../../common/auth/gql-user.parm");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(email, password, context) {
        const user = await this.usersService.findOne({ email });
        if (!user) {
            throw new common_1.UnprocessableEntityException('User not found');
        }
        const isPasswordCorrect = await this.authService.comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.UnprocessableEntityException('Password is incorrect');
        }
        this.authService.setRefreshToken({ user, res: context.res });
        return this.authService.getAccessToken({ user });
    }
    async logout(context) {
        const refreshToken = context.req.headers.cookie.split('=')[1];
        const accessToken = context.req.headers.authorization.split(' ')[1];
        const AccessTokenRemainTime = await this.authService.isValidateAccessToken({
            accessToken,
        });
        const RefreshTokenRemainTime = await this.authService.isValidateRefreshToken({ refreshToken });
        await this.authService.expireTokenStore({
            accessToken,
            refreshToken,
            AccessTokenRemainTime,
            RefreshTokenRemainTime,
        });
        return '로그아웃에 성공했습니다.';
    }
    restoreAccessToken(currentUser) {
        return this.authService.getAccessToken({ user: currentUser });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthRefreshGuard),
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, gql_user_parm_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "restoreAccessToken", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map