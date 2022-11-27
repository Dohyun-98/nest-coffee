import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entity/user.entity';
import { JwtRefreshStrategy } from 'common/auth/jwt-refresh.stratgy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from 'common/auth/jwt-social-google.strategy';
import { JwtNaverStrategy } from 'common/auth/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from 'common/auth/jwt-social-kakao.strategy';
import { JwtFacebookStrategy } from 'common/auth/jwt-social-facebook.strategy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [
    JwtFacebookStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService,
    AuthResolver,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
