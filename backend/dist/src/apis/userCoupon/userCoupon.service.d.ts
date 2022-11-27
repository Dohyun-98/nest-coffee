import { Repository } from 'typeorm';
import { UserCoupon } from './entity/userCoupon.entity';
export declare class UserCouponService {
    private readonly userCouponRepository;
    constructor(userCouponRepository: Repository<UserCoupon>);
    findWithId({ id }: {
        id: any;
    }): Promise<UserCoupon>;
    create({ userId, price }: {
        userId: any;
        price: any;
    }): Promise<{
        user: any;
        price: any;
    } & UserCoupon>;
}
