import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobInput {
  @Field()
  jobInfo: string;
}
