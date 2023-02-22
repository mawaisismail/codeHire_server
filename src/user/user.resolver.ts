import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './types/user.type';
import { UserService } from './user.service';
import { UserArgs } from './dto/user.args';
import { SuccessType } from '../common/types/successType';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserType)
  async createUser(@Args('userArgs') userArgs: UserArgs) {
    return await this.userService.createUser(userArgs);
  }
  @Query(() => UserType)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => SuccessType, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
