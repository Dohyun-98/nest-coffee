export declare class IamportService {
    getAccessToken(): Promise<any>;
    checkPaid({ impUid: imp_uid, access_token, amount }: {
        impUid: any;
        access_token: any;
        amount: any;
    }): Promise<void>;
    cancel({ impUid, access_token, reason }: {
        impUid: any;
        access_token: any;
        reason: any;
    }): Promise<any>;
    checkCancel({ impUid: imp_uid, access_token, amount }: {
        impUid: any;
        access_token: any;
        amount: any;
    }): Promise<void>;
}
