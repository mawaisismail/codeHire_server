import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobEntity, JobSchema } from './models/jobs.entity';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
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
