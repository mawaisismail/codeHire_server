import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobInput {
  @Field()
  jobInfo: string;
}
@InputType()
export class JobApplyDto {
  @Field()
  company_id: string;
  @Field()
  job_id: string;
  @Field()
  user_id: string;
  @Field()
  name: string;
  @Field()
  coverLetter: string;
  @Field()
  message: string;
  @Field()
  email: string;
}
