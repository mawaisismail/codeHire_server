import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './types/user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/user.args';
import { SuccessType } from '../common/types/successType';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserEntity)
  async createUser(@Args('userArgs') userArgs: UserArgs) {
    return await this.userService.createUser(userArgs);
  }
  @Query(() => UserEntity)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation(() => SuccessType, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
