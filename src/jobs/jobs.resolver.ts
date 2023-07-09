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
import { ChatMessageEntity } from '../chat/models/chat-message.entity';

@Resolver(() => JobEntity)
export class JobsResolver {
  constructor(
    private readonly jobService: JobsService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [JobEntity])
  async getJobs() {
    return await this.jobService.getJobs();
  }

  @Query(() => [JobEntity])
  async getCompanyJobs(@User() company: IUser) {
    return await this.jobService.getCompanyJobs(company);
  }

  @Query(() => [ApplyJobs])
  async getApplyJobs() {
    return await this.jobService.getApplyJobs();
  }
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
  async company(@Parent() jobEntity: JobEntity) {
    const { companyID } = jobEntity;
    return this.userService.getUserById(companyID, true);
  }
}
