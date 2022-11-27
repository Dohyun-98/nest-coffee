declare const JwtFacebookStrategy_base: new (...args: any[]) => any;
export declare class JwtFacebookStrategy extends JwtFacebookStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, public_profile: any): Promise<{
        name: any;
        email: any;
        password: string;
    }>;
}
export {};
