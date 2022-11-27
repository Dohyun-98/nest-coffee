import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersService;
    private readonly cacheManager;
    constructor(jwtService: JwtService, usersService: UsersService, cacheManager: Cache);
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    getAccessToken({ user }: {
        user: any;
    }): string;
    setRefreshToken({ user, res }: {
        user: any;
        res: any;
    }): void;
    socialLogin({ req, res }: {
        req: any;
        res: any;
    }): Promise<void>;
    isValidateAccessToken({ accessToken }: {
        accessToken: any;
    }): Promise<void>;
    isValidateRefreshToken({ refreshToken }: {
        refreshToken: any;
    }): Promise<void>;
    expireTokenStore({ accessToken, refreshToken, AccessTokenRemainTime, RefreshTokenRemainTime, }: {
        accessToken: any;
        refreshToken: any;
        AccessTokenRemainTime: any;
        RefreshTokenRemainTime: any;
    }): Promise<void>;
}
