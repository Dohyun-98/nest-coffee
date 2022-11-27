import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(email: string, password: string, context: any): Promise<string>;
    logout(context: any): Promise<string>;
    restoreAccessToken(currentUser: any): string;
}
