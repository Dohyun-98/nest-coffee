import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserInput } from 'src/apis/users/dto/createUserInput';
import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';
interface IOAuthUser {
  user?: CreateUserInput;
}
@Controller('/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('jwt-google'))
  loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.socialLogin({ req, res });
  }

  @UseGuards(AuthGuard('jwt-naver'))
  @Get('/naver')
  loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.socialLogin({ req, res });
  }

  @UseGuards(AuthGuard('jwt-kakao'))
  @Get('/kakao')
  loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.socialLogin({ req, res });
  }

  @UseGuards(AuthGuard('jwt-facebook'))
  @Get('/facebook')
  loginFacebook(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    this.authService.socialLogin({ req, res });
  }
}
