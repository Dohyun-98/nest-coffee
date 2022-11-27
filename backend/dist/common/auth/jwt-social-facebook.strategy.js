"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtFacebookStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
class JwtFacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'jwt-facebook') {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/login/facebook',
            scope: ['public_profile'],
            profileFields: ['id', 'displayName', 'photos', 'email'],
            prompt: 'consent',
        });
    }
    async validate(accessToken, refreshToken, public_profile) {
        console.log('accessToken : ', accessToken);
        console.log('refreshToken : ', refreshToken);
        console.log('public_profile : ', public_profile);
        console.log('email : ', public_profile.emails[0].value);
        return {
            name: public_profile.displayName,
            email: public_profile.emails[0].value,
            password: '1234',
        };
    }
}
exports.JwtFacebookStrategy = JwtFacebookStrategy;
//# sourceMappingURL=jwt-social-facebook.strategy.js.map