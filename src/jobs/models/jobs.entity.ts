import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from '../../user/models/user.entity';

@Schema()
@ObjectType('Job')
export class JobEntity {
  @Field(() => ID)
  id: string;
  @Prop()
  @Field(() => UserEntity)
  company: UserEntity;
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
  @Field(() => [String])
  responsibilities: string[];
  @Prop()
  @Field(() => [String])
  qualification: string[];
  @Prop()
  @Field(() => [String])
  skillsRequired: string[];
  @Prop()
  @Field()
  freeWords: string;
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
