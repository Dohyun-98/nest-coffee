import { Request, Response } from 'express';
import { CreateUserInput } from 'src/apis/users/dto/createUserInput';
import { AuthService } from './auth.service';
interface IOAuthUser {
    user?: CreateUserInput;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginGoogle(req: Request & IOAuthUser, res: Response): void;
    loginNaver(req: Request & IOAuthUser, res: Response): void;
    loginKakao(req: Request & IOAuthUser, res: Response): void;
    loginFacebook(req: Request & IOAuthUser, res: Response): void;
}
export {};
