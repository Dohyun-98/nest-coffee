import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'common/auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUserInput';
import { UpdateUserInput } from './dto/updateUserInput';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUser(@Args('email') email: string) {
    return this.usersService.findOne({ email });
  }

  @Query(() => [User])
  fetchUserWithDeleted(@Args('email') email: string) {
    return this.usersService.findWithDeleted({ email });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create({ createUserInput });
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update({ email, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('email') email: string) {
    return this.usersService.delete({ email });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('email') email: string) {
    return this.usersService.restore({ email });
  }
}
