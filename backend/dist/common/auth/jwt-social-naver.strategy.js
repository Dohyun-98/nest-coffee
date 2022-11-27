"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtNaverStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_naver_v2_1 = require("passport-naver-v2");
class JwtNaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_v2_1.Strategy, 'jwt-naver') {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/login/naver',
            scope: ['profile'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        console.log('accessToken : ', accessToken);
        console.log('refreshToken : ', refreshToken);
        console.log('profile : ', profile);
        return {
            email: profile.email,
            name: profile.name,
            password: '1234',
        };
    }
}
exports.JwtNaverStrategy = JwtNaverStrategy;
//# sourceMappingURL=jwt-social-naver.strategy.js.map