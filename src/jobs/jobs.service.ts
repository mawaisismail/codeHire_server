import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from './models/jobs.entity';
import { Model } from 'mongoose';
import { JobInput } from './dto/job.input';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
  ) {}

  async getJobs() {
    return this.job.find();
  }
  async createJob(jobInput: JobInput) {
    return await this.job.create({
      ...jobInput,
    });
  }
}
