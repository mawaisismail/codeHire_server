import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApplyJobs, JobEntity } from './models/jobs.entity';
import { JobsService } from './jobs.service';
import { UserService } from '../user/user.service';
import { JobApplyDto, JobInput } from './dto/job.input';
import { User } from '../common/user.decorator';
import { IUser } from '../common/interface/user';
import { CompanyService } from '../company/company.service';
import {UserEntity} from "../user/models/user.entity";
import {CompanyEntity} from "../company/models/company.entity";

@Resolver(() => JobEntity)
export class JobsResolver {
  constructor(
    private readonly jobService: JobsService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  @ResolveField('user', () => UserEntity)
  async getUser(@Parent() applyJobs: ApplyJobs) {
    const { user_id } = applyJobs;
    return await this.userService.getUserById(user_id);
  }

  @ResolveField('company', () => CompanyEntity)
  async getCompany(@Parent() applyJobs: ApplyJobs) {
    const { company_id } = applyJobs;
    return await this.companyService.getCompanyId(company_id);
  }

  @ResolveField('jobs', () => [JobEntity])
  async getJobsRes(@Parent() applyJobs: ApplyJobs) {
    const { job_id } = applyJobs;
    return await this.jobService.getJobById(job_id);
  }

  @Query(() => [JobEntity])
  async getJobs(): Promise<any> {
    return await this.jobService.getJobs();
  }

  @Query(() => JobEntity)
  async getJobById(@Args('id') id: string): Promise<any> {
    console.log(id);
    return await this.jobService.getJobById(id);
  }

  @Query(() => [JobEntity])
  async getCompanyJobs(@User() company: IUser) {
    return await this.jobService.getCompanyJobs(company);
  }

  // @Query(() => [ApplyJobs])
  // async getApplyJobs() {
  //   return await this.jobService.getApplyJobs();
  // }
  @Query(() => [ApplyJobs])
  async getApplyJobsByUser(@User() user: IUser) {
    return await this.jobService.getApplyJobsByUser(user);
  }

  @Mutation(() => JobEntity, { nullable: true })
  async createJob(@User() user: IUser, @Args('jobInput') jobInput: JobInput) {
    return await this.jobService.createJob(jobInput, user);
  }

  @Mutation(() => ApplyJobs, { nullable: true })
  async applyJob(
    @User() user: IUser,
    @Args('jobApplyDto') jobApplyDto: JobApplyDto,
  ) {
    return await this.jobService.applyJob(jobApplyDto);
  }

  @ResolveField()
  async company(@Parent() jobEntity: any) {
    const id = jobEntity?.companyID || jobEntity?.company_id;
    return this.companyService.getCompanyId(id);
  }
}
