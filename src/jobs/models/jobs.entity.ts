import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
export class desireType {
  @Field(() => [String])
  occupation: string[];
  @Field()
  employmentType: string;
  @Field({ nullable: true })
  annualSalary: string;
}

@Schema()
@ObjectType('Job')
export class JobEntity {
  @Field()
  _id: string;
  @Prop()
  @Field()
  title: string;
  @Prop()
  @Field()
  coverImage: string;
  @Prop()
  @Field()
  experience: string;
  @Prop()
  @Field()
  employmeeType: string;
  @Prop()
  @Field()
  position: string;
  @Prop()
  @Field()
  salary: string;
  @Prop()
  @Field()
  description: string;
  @Prop()
  @Field((type) => [String])
  responsibilities: string[];
  @Prop()
  @Field((type) => [String])
  qualification: string[];
  @Prop()
  @Field((type) => [String])
  skillsRequired: string[];
  @Prop()
  @Field()
  freeWords: string;
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
