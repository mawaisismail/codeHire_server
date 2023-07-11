import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplyJobs, JobEntity } from './models/jobs.entity';
import { Model } from 'mongoose';
import { JobApplyDto, JobInput } from './dto/job.input';
import { IUser } from '../common/interface/user';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../user/interfaces/tokenPayload';
import { UserService } from '../user/user.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
    @InjectModel(ApplyJobs.name)
    private readonly applyJobModel: Model<ApplyJobs>,
    private readonly userService: UserService,
  ) {}

  async getJobs() {
    return this.job.find();
  }

  async getJobById(id: string) {
    return this.job.findOne({ id });
  }

  async cancledHired(id: string) {
    return this.applyJobModel.deleteOne({ id });
  }

  async getRecommendedJobs(user: IUser) {
    try {
      const userData = await this.userService.getUserById(user.userID);
      if (!userData) {
        throw new NotFoundException('User not found');
      }
      return this.job.find({
        skills: { $in: userData.skills },
      });
    } catch (err) {
      throw new NotFoundException('Something went wrong');
    }
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
      const job = JSON.parse(jobInput.jobInfo);
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
  async applyJob(applyDTO: JobApplyDto, user: IUser) {
    try {
      const job = await this.getJobById(applyDTO.job_id);
      if (!job) {
        throw new NotFoundException('Job not found');
      }
      const getApply = await this.applyJobModel.findOne({
        job_id: applyDTO.job_id,
        user_id: user.userID,
      });
      if (user.usertype === 'USER' && getApply?.apply_by_user) {
        throw new NotFoundException('User Have Already Applied');
      }
      if (getApply) {
        user.usertype === UserType.USER
          ? (getApply.apply_by_user = true)
          : (getApply.hire_by_company = true);
        if (getApply.hire_by_company && getApply.apply_by_user) {
          getApply.matched = true;
        }
        getApply.apply_by_user && getApply.hire_by_company
          ? (getApply.matched = true)
          : (getApply.matched = false);

        return await this.applyJobModel.updateOne(
          { id: getApply.id },
          {
            ...applyDTO,
            matched: true,
            apply_by_user: true,
          },
        );
      }
      const apply =
        user.usertype === UserType.USER
          ? { apply_by_user: true }
          : { hire_by_company: true };
      return await this.applyJobModel.create({
        ...apply,
        matched: false,
        id: uuidv4(),
        ...applyDTO,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async hireUser(job_id: string, user_id: string, user: IUser) {
    try {
      const job = await this.getJobById(job_id);
      if (!job) {
        throw new NotFoundException('Job not found');
      }
      const getApply = await this.applyJobModel
        .findOne({
          job_id: job_id,
          company_id: user.userID,
          user_id: user_id,
        })
        .exec();

      if (user.usertype === 'COMPANY' && getApply?.hire_by_company) {
        throw new NotFoundException('Company Have Already Hired');
      }

      if (getApply?.id) {
        return await this.applyJobModel.updateOne(
          {
            id: getApply.id,
            company_id: user.userID,
            user_id: user_id,
          },
          {
            hire_by_company: true,
            matched: true,
          },
        );
      }

      return await this.applyJobModel.create({
        id: uuidv4(),
        user_id: user_id,
        company_id: user.userID,
        job_id: job_id,
        hire_by_company: true,
        matched: false,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
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
          apply_by_user: true,
          matched: false,
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
          hire_by_company: true,
          matched: false,
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

  async getCompanyOffers(id: string) {
    const query = [
      {
        $match: {
          company_id: id,
          apply_by_user: true,
          matched: false,
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

  async getUserJobOffer(id: string) {
    const query = [
      {
        $match: {
          user_id: id,
          hire_by_company: true,
          matched: false,
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

  async getCompanyHired(id: string) {
    const query = [
      {
        $match: {
          company_id: id,
          matched: true,
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

  async getUserHiredjobs(id: string) {
    const query = [
      {
        $match: {
          user_id: id,
          matched: true,
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

  async getCompanyChatList(id: string) {
    const query = [
      {
        $match: {
          company_id: id,
          matched: true,
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

  async getUserChatList(id: string) {
    const query = [
      {
        $match: {
          user_id: id,
          matched: true,
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
    const applyJobs = await this.applyJobModel
      .find({ user_id: user.userID })
      .exec();

    return applyJobs;
  }
}
