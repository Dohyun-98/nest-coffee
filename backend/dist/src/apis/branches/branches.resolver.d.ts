import { BranchesService } from './branches.service';
import { CreateBranchInput } from './dto/createBranchInput';
import { UpdateBranchInput } from './dto/updateBranchInput';
import { Branch } from './entity/branch.entity';
export declare class BranchesResolver {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    fetchBranches(): Promise<Branch[]>;
    fetchBranch(id: string): Promise<Branch>;
    updateBranch(id: string, updateBranchInput: UpdateBranchInput): Promise<boolean>;
    createBranch(createBranchInput: CreateBranchInput): Promise<any>;
    deleteBranch(id: string): Promise<boolean>;
}
