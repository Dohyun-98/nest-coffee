import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.split('=')[1];
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const refreshToken = req.headers.cookie.split('=')[1];
    const isExpire = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );
    if (isExpire) {
      throw new UnauthorizedException('Refresh Token Expired');
    }
    return { email: payload.email, id: payload.sub };
  }
}
