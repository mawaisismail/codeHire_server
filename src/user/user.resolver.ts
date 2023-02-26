import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './models/user.entity';
import { UserService } from './user.service';
import { UserInputType } from './dto/user.args';
import { SuccessType } from '../common/types/successType';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserEntity)
  async createUser(@Args('userInputType') userInputType: UserInputType) {
    return await this.userService.createUser(userInputType);
  }
  // @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUserById(@Args('uid') uid: string) {
    return await this.userService.getUserById(uid);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessType, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
