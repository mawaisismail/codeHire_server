import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from './models/jobs.entity';
import { Model } from 'mongoose';
import { JobInput } from './dto/job.input';
import { IUser } from '../common/interface/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
  ) {}

  async getJobs() {
    return this.job.find();
  }
  async createJob(jobInput: JobInput, user: IUser) {
    return await this.job.create({
      ...JSON.parse(jobInput.jobInfo),
      companyID: user.userID,
      id: uuidv4(),
    });
  }
}
