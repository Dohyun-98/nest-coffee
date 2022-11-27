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
exports.JwtRefreshStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
let JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(cacheManager) {
        super({
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie;
                const refreshToken = cookie.split('=')[1];
                return refreshToken;
            },
            secretOrKey: process.env.REFRESH_SECRET,
            passReqToCallback: true,
        });
        this.cacheManager = cacheManager;
    }
    async validate(req, payload) {
        const refreshToken = req.headers.cookie.split('=')[1];
        const isExpire = await this.cacheManager.get(`refreshToken:${refreshToken}`);
        if (isExpire) {
            throw new common_1.UnauthorizedException('Refresh Token Expired');
        }
        return { email: payload.email, id: payload.sub };
    }
};
JwtRefreshStrategy = __decorate([
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], JwtRefreshStrategy);
exports.JwtRefreshStrategy = JwtRefreshStrategy;
//# sourceMappingURL=jwt-refresh.stratgy.js.map