import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobInput {
  @Field()
  jobInfo: string;
}
@InputType()
export class JobApplyDto {
  @Field({ nullable: true })
  company_id: string;
  @Field()
  job_id: string;
  @Field({ nullable: true })
  user_id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  coverLetter: string;
  @Field({ nullable: true })
  message: string;
  @Field({ nullable: true })
  email: string;
}

@InputType()
export class ApplyJobArgs {
  @Field()
  applyJob: string;
}
