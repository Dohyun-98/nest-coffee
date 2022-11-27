"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtKakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
class JwtKakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'jwt-kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/login/kakao',
            scope: ['account_email', 'profile_nickname'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        console.log('accessToken : ', accessToken);
        console.log('refreshToken : ', refreshToken);
        console.log('profile : ', profile);
        console.log('email :', profile._json.kakao_account.email);
        return {
            email: profile._json.kakao_account.email,
            name: profile.username,
            password: '1234',
        };
    }
}
exports.JwtKakaoStrategy = JwtKakaoStrategy;
//# sourceMappingURL=jwt-social-kakao.strategy.js.map