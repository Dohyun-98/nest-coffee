import { IContext } from 'common/types/context';
import { IamportService } from '../iamport/iamport.service';
import { PointPayment } from './entity/pointPayment.entity';
import { PointPaymentsService } from './pointPayments.service';
export declare class PointPaymentsResolver {
    private readonly pointPaymentsService;
    private readonly iamportService;
    constructor(pointPaymentsService: PointPaymentsService, iamportService: IamportService);
    createPointPayment(impUid: string, amount: number, user: IContext): Promise<PointPayment>;
    cancelPointPayment(impUid: string, amount: number, reason: string, user: IContext): Promise<PointPayment>;
}
