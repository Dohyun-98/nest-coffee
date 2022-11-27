import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { PointPayment } from './entity/pointPayment.entity';
export declare class PointPaymentsService {
    private readonly userRepository;
    private readonly pointPaymentRepository;
    private readonly dataSource;
    constructor(userRepository: Repository<User>, pointPaymentRepository: Repository<PointPayment>, dataSource: DataSource);
    create({ impUid, amount, user: _user, status }: {
        impUid: any;
        amount: any;
        user: any;
        status: any;
    }): Promise<PointPayment>;
    isPaidDuplicate({ impUid }: {
        impUid: any;
    }): Promise<void>;
    isCancelDuplicate({ impUid }: {
        impUid: any;
    }): Promise<void>;
    cancel({ impUid, amount, user: _user, status }: {
        impUid: any;
        amount: any;
        user: any;
        status: any;
    }): Promise<PointPayment>;
}
