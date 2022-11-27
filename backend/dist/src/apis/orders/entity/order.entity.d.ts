import { Payment } from 'src/apis/payments/entity/payment.entity';
import { Product } from 'src/apis/products/entity/product.entity';
import { User } from 'src/apis/users/entity/user.entity';
export declare class Order {
    id: string;
    orderNumber: string;
    orderDate: Date;
    orderTotal: number;
    products: Product[];
    payment: Payment;
    user: User;
}
