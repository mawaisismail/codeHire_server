import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './models/user.entity';
import { UserService } from './user.service';
import { UserArgs } from './dto/user.args';
import { SuccessType } from '../common/types/successType';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserEntity)
  async createUser(@Args('userArgs') userArgs: UserArgs) {
    return await this.userService.createUser(userArgs);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUserById(@Args('id') id: string) {
    return await this.userService.getUserById(id);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessType, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
