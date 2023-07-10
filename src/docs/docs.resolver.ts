import { Injectable } from '@nestjs/common';
import { DocsService } from './docs.service';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User } from '../common/user.decorator';
import { IUser } from '../common/interface/user';
import { DocsEntity } from './model/docs.entity';

@Injectable()
export class DocsResolver {
  constructor(private docsService: DocsService) {}

  @Query(() => [DocsEntity]) // <-- change this
  async getDocs(@User() user: IUser): Promise<any> {
    console.log(user);
    return await this.docsService.getDocsById(user.userID);
  }
  @Mutation(() => DocsEntity)
  async upload(
    @Args('url') url: string,
    @Args('name') name: string,
    @User() user: IUser,
  ): Promise<any> {
    return await this.docsService.uploadDocs(url, user.userID, name);
  }
  @Mutation(() => DocsEntity)
  async deleteDoc(@Args('uid') uid: string): Promise<any> {
    return await this.docsService.deleteDoc(uid);
  }
}
