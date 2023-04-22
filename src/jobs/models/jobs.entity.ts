import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyEntity } from '../../company/models/company.entity';

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
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
