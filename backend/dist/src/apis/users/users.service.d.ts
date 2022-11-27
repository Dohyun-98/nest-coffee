import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    findWithId({ id }: {
        id: any;
    }): Promise<User[]>;
    findWithDeleted({ email }: {
        email: any;
    }): Promise<User>;
    create({ createUserInput }: {
        createUserInput: any;
    }): Promise<any>;
    update({ email, updateUserInput }: {
        email: any;
        updateUserInput: any;
    }): Promise<boolean>;
    delete({ email }: {
        email: any;
    }): Promise<boolean>;
    restore({ email }: {
        email: any;
    }): Promise<boolean>;
}
