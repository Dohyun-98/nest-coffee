import { UsersService } from '../users/users.service';
import { UserCoupon } from './entity/userCoupon.entity';
import { UserCouponService } from './userCoupon.service';
export declare class UserCouponResolver {
    private readonly userCouponService;
    private readonly usersService;
    constructor(userCouponService: UserCouponService, usersService: UsersService);
    findCoupon(id: string): Promise<UserCoupon>;
    createUserCoupon(userId: string, price: number): Promise<{
        user: any;
        price: any;
    } & UserCoupon>;
}
