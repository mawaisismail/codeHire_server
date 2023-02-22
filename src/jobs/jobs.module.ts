import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity, JobSchema } from './models/jobs.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobEntity.name,
        schema: JobSchema,
      },
    ]),
  ],
  providers: [],
})
export class JobsModule {}
