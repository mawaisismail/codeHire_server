import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyEntity } from '../../company/models/company.entity';
import { ChatMessageEntity } from '../../chat/models/chat-message.entity';

@Schema()
@ObjectType('Job')
export class JobEntity {
  @Prop()
  @Field()
  id: string;
  @Prop()
  @Field(() => CompanyEntity, { nullable: true })
  company: CompanyEntity;
  @Prop()
  @Field()
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
  @Field((returns) => [String], { nullable: true })
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
  @Field((returns) => [String], { nullable: true })
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
  @Field()
  id: string;
  @Prop()
  @Field()
  user_id: string;
  @Prop()
  @Field()
  company_id: string;
  @Prop()
  @Field()
  job_id: string;
  @Prop()
  @Field()
  status: string;
  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field()
  coverLetter: string;
  @Prop()
  @Field()
  message: string;
  @Prop()
  @Field()
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
