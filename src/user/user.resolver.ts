import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SaveUserEntity, UserEntity } from './models/user.entity';
import { UserService } from './user.service';
import { UserInputType } from './dto/user.args';
import { SuccessType } from '../common/types/successType';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/user.decorator';
import { IUser } from '../common/interface/user';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserEntity)
  async createUser(@Args('userInputType') userInputType: UserInputType) {
    return await this.userService.createUser(userInputType);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @User() user: IUser,
    @Args('userInputType') userInputType: UserInputType,
  ) {
    return await this.userService.updateUser(userInputType, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUser(@User() user: IUser) {
    return await this.userService.getUserById(user.userID);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserEntity])
  async userSearch(@Args('search') search: string) {
    return await this.userService.getFilterUser(search);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserEntity])
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserEntity])
  async getAllSaveUsers(@User() user: IUser) {
    return await this.userService.getAllSaveUser(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SaveUserEntity)
  async saveUser(@Args('id') id: string, @User() user: IUser) {
    return await this.userService.saveUsers(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SaveUserEntity)
  async cancelSaveUser(@Args('id') id: string, @User() user: IUser) {
    return await this.userService.cancelSaveUsers(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity)
  async getUserById(@Args('uid') uid: string) {
    return await this.userService.getUserById(uid);
  }

  @Query(() => UserEntity)
  async getLoginUser(@Args('uid') uid: string) {
    return await this.userService.getLoginUser(uid);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SuccessType, { nullable: true })
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
