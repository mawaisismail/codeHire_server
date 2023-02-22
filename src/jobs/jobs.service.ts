import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from './models/jobs.entity';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
    private readonly userService: UserService,
  ) {}

  async getJobs() {
    return this.job.find();
  }
  async createJob() {
    const user = await this.userService.getUserById('63f635733387a27395a7e8f6');
    return await this.job.create({
      salary: '1000$',
      company: user,
    });
  }
}
