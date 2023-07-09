import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get('/:id')
  getAllCompanies(@Param('id') id: string) {
    return this.jobService.getApplyJobs(id);
  }

  @Get('/applyCompany/:id')
  getCompanyApplyUsers(@Param('id') id: string) {
    return this.jobService.getCompanyApplyUsers(id);
  }
}
