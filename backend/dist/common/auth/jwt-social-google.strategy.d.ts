import { Strategy } from 'passport-google-oauth20';
declare const JwtGoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtGoogleStrategy extends JwtGoogleStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, profile: any): Promise<{
        email: any;
        name: any;
        password: string;
    }>;
}
export {};
