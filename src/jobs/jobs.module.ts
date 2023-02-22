import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity, JobSchema } from './models/jobs.entity';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobEntity.name,
        schema: JobSchema,
      },
    ]),
  ],
  providers: [JobsResolver, JobsService],
})
export class JobsModule {}
