import { Repository } from 'typeorm';
import { Branch } from './entity/branch.entity';
export declare class BranchesService {
    private readonly branchRepository;
    constructor(branchRepository: Repository<Branch>);
    findAll(): Promise<Branch[]>;
    findOne({ id }: {
        id: any;
    }): Promise<Branch>;
    create({ createBranchInput }: {
        createBranchInput: any;
    }): Promise<any>;
    update({ id, updateBranchInput }: {
        id: any;
        updateBranchInput: any;
    }): Promise<boolean>;
    delete({ id }: {
        id: any;
    }): Promise<boolean>;
}
