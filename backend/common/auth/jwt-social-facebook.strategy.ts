import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

export class JwtFacebookStrategy extends PassportStrategy(
  Strategy,
  'jwt-facebook',
) {
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
