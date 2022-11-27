import { User } from 'src/apis/users/entity/user.entity';
export declare enum POINT_PAYMENT_STATUS_ENUM {
    PAYMENT = "PAYMENT",
    CANCEL = "CANCEL"
}
export declare class PointPayment {
    id: string;
    impUid: string;
    amount: number;
    createdAt: Date;
    status: POINT_PAYMENT_STATUS_ENUM;
    user: User;
}
