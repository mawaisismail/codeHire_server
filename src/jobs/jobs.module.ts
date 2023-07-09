import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApplyJobs,
  ApplyJobSchema,
  JobEntity,
  JobSchema,
} from './models/jobs.entity';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    MongooseModule.forFeature([
      {
        name: JobEntity.name,
        schema: JobSchema,
      },
      {
        name: ApplyJobs.name,
        schema: ApplyJobSchema,
      },
    ]),
  ],
  controllers:[JobsController],
  providers: [JobsResolver, JobsService],
})
export class JobsModule {}
