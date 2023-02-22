import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { JobEntity } from './models/jobs.entity';
import { JobsService } from './jobs.service';

@Resolver(() => JobEntity)
export class JobsResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [JobEntity])
  async getJobs() {
    return await this.jobService.getJobs();
  }

  @Mutation(() => JobEntity)
  async createJob() {
    return await this.jobService.createJob();
  }
}
