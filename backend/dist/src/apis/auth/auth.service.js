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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, usersService, cacheManager) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.cacheManager = cacheManager;
    }
    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    getAccessToken({ user }) {
        return this.jwtService.sign({
            email: user.email,
            sub: user.id,
        }, {
            secret: process.env.ACCESS_SECRET,
            expiresIn: '30s',
        });
    }
    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign({ email: user.email, sub: user.id }, { secret: process.env.REFRESH_SECRET, expiresIn: '7d' });
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; path=/;`);
    }
    async socialLogin({ req, res }) {
        let user = await this.usersService.findOne({ email: req.user.email });
        if (!user) {
            user = await this.usersService.create({
                createUserInput: req.user,
            });
        }
        this.setRefreshToken({ user, res });
        res.redirect('http://localhost:5500/main-project/frontend/login/index.html');
    }
    async isValidateAccessToken({ accessToken }) {
        jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
            if (err) {
                throw new common_1.UnprocessableEntityException('Access Token Expired');
            }
            return Math.floor(decoded.exp - Date.now() / 1000);
        });
    }
    async isValidateRefreshToken({ refreshToken }) {
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) {
                throw new common_1.UnprocessableEntityException('Refresh Token Expired');
            }
            return Math.floor(decoded.exp - Date.now() / 1000);
        });
    }
    async expireTokenStore({ accessToken, refreshToken, AccessTokenRemainTime, RefreshTokenRemainTime, }) {
        try {
            await this.cacheManager.set(`accessToken:${accessToken}`, true, {
                ttl: AccessTokenRemainTime,
            });
            await this.cacheManager.set(`refreshToken:${refreshToken}`, true, {
                ttl: RefreshTokenRemainTime,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Redis Internal Server Error');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map