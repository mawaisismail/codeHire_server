import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplyJobs, JobEntity } from './models/jobs.entity';
import mongoose, { Model } from 'mongoose';
import { JobApplyDto, JobInput } from './dto/job.input';
import { IUser } from '../common/interface/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
    @InjectModel(ApplyJobs.name)
    private readonly applyJobModel: Model<ApplyJobs>,
  ) {}

  async getJobs() {
    return this.job.find();
  }

  async getJobById(id: string) {
    return this.job.findOne({ id });
  }

  async getCompanyJobs(company: IUser) {
    return this.job.find({ companyID: company.userID });
  }

  async createJob(jobInput: JobInput, company: IUser) {
    return await this.job.create({
      ...JSON.parse(jobInput.jobInfo),
      companyID: company.userID,
      id: uuidv4(),
    });
  }
  async applyJob(applyDTO: JobApplyDto) {
    return await this.applyJobModel.create({
      id: uuidv4(),
      ...applyDTO,
    });
  }

  async getApplyJobs(id: string) {
    const query = [
      {
        $match: {
          user_id: id,
        },
      },
      {
        $lookup: {
          from: 'userentities',
          localField: 'user_id',
          foreignField: 'uid',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'companyentities',
          localField: 'company_id',
          foreignField: 'uid',
          as: 'company',
        },
      },
      {
        $lookup: {
          from: 'jobentities',
          localField: 'job_id',
          foreignField: 'id',
          as: 'job',
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ['$user', 0],
          },
        },
      },
      {
        $addFields: {
          company: {
            $arrayElemAt: ['$company', 0],
          },
        },
      },
      {
        $addFields: {
          job: {
            $arrayElemAt: ['$job', 0],
          },
        },
      },
    ];
    return this.applyJobModel.aggregate(query);
  }
  async getCompanyApplyUsers(id: string) {
    const query = [
      {
        $match: {
          company_id: id,
        },
      },
      {
        $lookup: {
          from: 'userentities',
          localField: 'user_id',
          foreignField: 'uid',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'companyentities',
          localField: 'company_id',
          foreignField: 'uid',
          as: 'company',
        },
      },
      {
        $lookup: {
          from: 'jobentities',
          localField: 'job_id',
          foreignField: 'id',
          as: 'job',
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ['$user', 0],
          },
        },
      },
      {
        $addFields: {
          company: {
            $arrayElemAt: ['$company', 0],
          },
        },
      },
      {
        $addFields: {
          job: {
            $arrayElemAt: ['$job', 0],
          },
        },
      },
    ];
    return this.applyJobModel.aggregate(query);
  }

  async getApplyJobsByUser(user: IUser) {
    console.log(user);
    const applyJobs = await this.applyJobModel
      .find({ user_id: user.userID })
      .exec();

    return applyJobs;
  }
}
