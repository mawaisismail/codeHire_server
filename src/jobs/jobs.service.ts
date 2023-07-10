import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateJob(jobInput: JobInput, user: IUser) {
    try {
      const job: JobEntity = JSON.parse(jobInput.jobInfo);
      const getJob = await this.getJobById(job.id);
      if (!getJob) {
        throw new NotFoundException('Job not found');
      }
      // if (job.companyID !== user.userID) {
      //   console.log(job.companyID, user.userID);
      //   throw new NotFoundException('Something went wrong');
      // }
      return await this.job.update(
        { id: job.id },
        {
          ...job,
        },
      );
    } catch (err) {
      throw new NotFoundException('Something went wrong');
    }
  }
  async applyJob(applyDTO: JobApplyDto) {
    return await this.applyJobModel.create({
      id: uuidv4(),
      ...applyDTO,
    });
  }

  async getFilterJobs(search: any) {
    try {
      const {
        description,
        responsibilities,
        offer_salary,
        position,
        skills,
        title,
      } = JSON.parse(search);
      const query: any = {};
      // Add filters based on user input
      if (description) {
        query.description = { $regex: new RegExp(description, 'i') }; // Case-insensitive regex match for 'about' field
      }

      if (responsibilities) {
        query['responsibilities'] = {
          $regex: new RegExp(responsibilities, 'i'),
        }; // Case-insensitive regex match for 'education' field
      }

      if (offer_salary) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query.offer_salary = {
          $regex: new RegExp(offer_salary, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (position) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['position'] = {
          $regex: new RegExp(position, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (skills) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['skills'] = {
          $regex: new RegExp(skills, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (title) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['title'] = {
          $regex: new RegExp(title, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      return await this.job.find(query);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
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
