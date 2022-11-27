import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        role: user.role,
      },
      {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '30m',
      },
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.REFRESH_SECRET, expiresIn: '7d' },
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; path=/;`,
    );
  }

  async socialLogin({ req, res }) {
    let user = await this.usersService.findOne({ email: req.user.email });
    if (!user) {
      user = await this.usersService.create({
        createUserInput: req.user,
      });
    }
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  async isValidateAccessToken({ accessToken }) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) {
        throw new UnprocessableEntityException('Access Token Expired');
      }
      return Math.floor(decoded.exp - Date.now() / 1000);
    });
  }

  async isValidateRefreshToken({ refreshToken }) {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        throw new UnprocessableEntityException('Refresh Token Expired');
      }
      return Math.floor(decoded.exp - Date.now() / 1000);
    });
  }

  async expireTokenStore({
    accessToken,
    refreshToken,
    AccessTokenRemainTime,
    RefreshTokenRemainTime,
  }) {
    try {
      await this.cacheManager.set(`accessToken:${accessToken}`, true, {
        ttl: AccessTokenRemainTime,
      });
      await this.cacheManager.set(`refreshToken:${refreshToken}`, true, {
        ttl: RefreshTokenRemainTime,
      });
    } catch (error) {
      throw new InternalServerErrorException('Redis Internal Server Error');
    }
  }
}
