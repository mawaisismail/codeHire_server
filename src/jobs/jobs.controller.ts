import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get('/:id')
  getUserApplyJobs(@Param('id') id: string) {
    return this.jobService.getApplyJobs(id);
  }

  @Get('/company/:id')
  async getCompanyApplyUsers(@Param('id') id: string) {
    return await this.jobService.getCompanyApplyUsers(id);
  }
  @Get('/company/request/:id')
  async getCompanyRequest(@Param('id') id: string) {
    return await this.jobService.getCompanyOffers(id);
  }
  @Get('/company/hired/:id')
  async getHiredUser(@Param('id') id: string) {
    return await this.jobService.getCompanyHired(id);
  }
  @Get('/hired/:id')
  async getHiredJobs(@Param('id') id: string) {
    return await this.jobService.getUserHiredjobs(id);
  }
  @Get('request/:id')
  async getUserRequest(@Param('id') id: string) {
    return await this.jobService.getUserJobOffer(id);
  }
}
