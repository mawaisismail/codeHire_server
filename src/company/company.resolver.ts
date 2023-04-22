import { Injectable, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Args, Mutation } from '@nestjs/graphql';
import { CreateCompanyArgs } from './dto/company.args';
import { CompanyEntity } from './models/company.entity';
import { User } from '../common/user.decorator';
import { IUser } from '../common/interface/user';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Injectable()
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Mutation(() => CompanyEntity)
  async createCompany(
    @Args('createCompanyArgs') createCompanyArgs: CreateCompanyArgs,
  ) {
    return await this.companyService.createCompany(createCompanyArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CompanyEntity)
  async updateCompany(
    @User() company: IUser,
    @Args('createCompanyArgs') createCompanyArgs: CreateCompanyArgs,
  ) {
    return await this.companyService.updateCompany(createCompanyArgs, company);
  }
}
