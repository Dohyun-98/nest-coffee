import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    validate(req: any, payload: any): Promise<{
        email: any;
        id: any;
    }>;
}
export {};
