declare const JwtKakaoStrategy_base: new (...args: any[]) => any;
export declare class JwtKakaoStrategy extends JwtKakaoStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, profile: any): Promise<{
        email: any;
        name: any;
        password: string;
    }>;
}
export {};
