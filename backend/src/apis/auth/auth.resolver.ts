import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthRefreshGuard } from 'common/auth/gql-auth.guard';
import { CurrentUser } from 'common/auth/gql-user.parm';
import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    console.log(user);
    const isPasswordCorrect = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException('Password is incorrect');
    }

    this.authService.setRefreshToken({ user, res: context.res });
    return await this.authService.getAccessToken({ user });
  }

  @Mutation(() => String)
  async logout(@Context() context: any) {
    // logout 함수는 context를 매개변수로 받아, 그 안에 있는 req에서 accessToken 과 refreshToken을 꺼냅니다.
    const refreshToken = context.req.headers.cookie.split('=')[1];
    const accessToken = context.req.headers.authorization.split(' ')[1];
    // jsonwebtoken 라이브러리를 이용해서 두 토큰을 검증합니다.
    const AccessTokenRemainTime = await this.authService.isValidateAccessToken({
      accessToken,
    });
    const RefreshTokenRemainTime =
      await this.authService.isValidateRefreshToken({ refreshToken });
    // cacheManager를 이용해서 레디스에 두 토큰을 각각 저장합니다.
    await this.authService.expireTokenStore({
      accessToken,
      refreshToken,
      AccessTokenRemainTime,
      RefreshTokenRemainTime,
    });
    // 레디스에 잘 저장이 되었다면 ‘로그아웃에 성공했습니다.’를 응답합니다.
    return '로그아웃에 성공했습니다.';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: any) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
