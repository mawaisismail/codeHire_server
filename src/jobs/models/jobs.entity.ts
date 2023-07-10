import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyEntity } from '../../company/models/company.entity';
import { ChatMessageEntity } from '../../chat/models/chat-message.entity';
import { UserEntity } from '../../user/models/user.entity';

@Schema()
@ObjectType('Job')
export class JobEntity {
  @Prop()
  @Field({ nullable: true })
  id: string;
  @Prop()
  @Field(() => CompanyEntity, { nullable: true })
  company: CompanyEntity;
  @Prop()
  @Field({ nullable: true })
  companyID: string;
  @Prop()
  @Field({ nullable: true })
  title: string;
  @Prop()
  @Field({ nullable: true })
  coverImg: string;
  @Prop()
  @Field({ nullable: true })
  experience: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  employmentType: string[];
  @Prop()
  @Field({ nullable: true })
  position: string;
  @Prop()
  @Field({ nullable: true })
  offer_salary: string;
  @Prop()
  @Field({ nullable: true })
  description: string;
  @Prop()
  @Field({ nullable: true })
  responsibilities: string;
  @Prop()
  @Field({ nullable: true })
  qualification: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  skills: string[];
  @Prop()
  @Field({ nullable: true })
  freeWords: string;
  @Prop()
  @Field({ nullable: true })
  location: string;
  @Field({ nullable: true })
  createdAt: string;
  @Field({ nullable: true })
  updatedAt: string;
}

@Schema()
@ObjectType('ApplyJobs')
export class ApplyJobs {
  @Prop()
  @Field({ nullable: true })
  id: string;
  @Prop()
  @Field({ nullable: true })
  user_id: string;
  @Prop()
  @Field({ nullable: true })
  company_id: string;
  @Prop()
  @Field({ nullable: true })
  job_id: string;
  @Prop()
  @Field({ nullable: true })
  status: string;
  @Prop()
  @Field({ nullable: true })
  name: string;
  @Prop()
  @Field({ nullable: true })
  coverLetter: string;
  @Prop()
  @Field({ nullable: true })
  message: string;
  @Prop()
  @Field({ nullable: true })
  apply_by_user: boolean;
  @Prop()
  @Field({ nullable: true })
  hire_by_company: boolean;
  @Prop()
  @Field({ nullable: true })
  matched: boolean;
  @Prop()
  @Field({ nullable: true })
  email: string;
  @Prop()
  @Field(() => [ChatMessageEntity], { nullable: true })
  chatMessages?: ChatMessageEntity[];

  @Field({ nullable: true })
  createdAt: string;
  @Field({ nullable: true })
  updatedAt: string;
}

export const JobSchema = SchemaFactory.createForClass(JobEntity).set(
  'timestamps',
  true,
);

export const ApplyJobSchema = SchemaFactory.createForClass(ApplyJobs).set(
  'timestamps',
  true,
);
