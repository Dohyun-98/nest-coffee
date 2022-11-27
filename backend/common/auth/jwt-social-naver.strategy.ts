import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'jwt-naver') {
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
