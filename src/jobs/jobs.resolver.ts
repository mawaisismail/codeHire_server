import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JobEntity } from './models/jobs.entity';
import { JobsService } from './jobs.service';
import { UserService } from '../user/user.service';
import { JobInput } from './dto/job.input';

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

  @Mutation(() => JobEntity, { nullable: true })
  async createJob(@Args('jobInput') jobInput: JobInput) {
    return await this.jobService.createJob(jobInput);
  }

  @ResolveField()
  async company(@Parent() jobEntity: JobEntity) {
    const { companyID } = jobEntity;
    return this.userService.getUserById(companyID);
  }
}
