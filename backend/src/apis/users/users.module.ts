import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'common/auth/jwt-access.stratgy';
import { User } from './entity/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [JwtAccessStrategy, UsersResolver, UsersService],
})
export class UsersModule {}
