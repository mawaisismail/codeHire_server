import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from '../../user/models/user.entity';

@Schema()
@ObjectType('Job')
export class JobEntity {
  @Field(() => ID)
  id: string;
  @Prop()
  @Field(() => UserEntity, { nullable: true })
  company: UserEntity;
  @Prop()
  @Field()
  companyID: string;
  @Prop()
  @Field({ nullable: true })
  title: string;
  @Prop()
  @Field({ nullable: true })
  coverImage: string;
  @Prop()
  @Field({ nullable: true })
  experience: string;
  @Prop()
  @Field({ nullable: true })
  employmeeType: string;
  @Prop()
  @Field({ nullable: true })
  position: string;
  @Prop()
  @Field({ nullable: true })
  salary: string;
  @Prop()
  @Field({ nullable: true })
  description: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  responsibilities: string[];
  @Prop()
  @Field(() => [String], { nullable: true })
  qualification: string[];
  @Prop()
  @Field(() => [String], { nullable: true })
  skillsRequired: string[];
  @Prop()
  @Field({ nullable: true })
  freeWords: string;
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
