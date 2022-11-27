import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchUsers(): Promise<User[]>;
    fetchUser(email: string): Promise<User>;
    fetchUserWithDeleted(email: string): Promise<User>;
    hello(): string;
    createUser(createUserInput: CreateUserInput): Promise<any>;
    updateUser(email: string, updateUserInput: UpdateUserInput): Promise<boolean>;
    deleteUser(email: string): Promise<boolean>;
    restoreUser(email: string): Promise<boolean>;
}
