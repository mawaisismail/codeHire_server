import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobInput {
  @Field()
  companyID: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  coverImage: string;
  @Field({ nullable: true })
  experience: string;
  @Field({ nullable: true })
  employmeeType: string;
  @Field({ nullable: true })
  position: string;
  @Field({ nullable: true })
  salary: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => [String], { nullable: true })
  responsibilities: string[];
  @Field(() => [String], { nullable: true })
  qualification: string[];
  @Field(() => [String], { nullable: true })
  skillsRequired: string[];
  @Field({ nullable: true })
  freeWords: string;
}
