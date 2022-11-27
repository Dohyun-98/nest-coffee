import { User } from 'src/apis/users/entity/user.entity';
export declare class UserCoupon {
    id: string;
    useTime: Date;
    user: User;
    isUsed: boolean;
    usePlace: string;
    price: number;
    createdAt: Date;
}
