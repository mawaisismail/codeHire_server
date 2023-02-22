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

@ObjectType()
export class educationType {
  @Field()
  degree: string;
  @Field()
  institute: string;
  @Field()
  year: string;
  @Field()
  info: string;
}

@ObjectType()
export class experiencesType {
  @Field()
  position: string;
  @Field()
  institute: string;
  @Field()
  year: string;
  @Field()
  info: string;
}
@Schema()
@ObjectType('User')
export class UserEntity {
  @Field()
  _id: string;
  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field()
  currentOccupation: string;
  @Prop()
  @Field()
  age: string;
  @Prop()
  @Field()
  birthDay: string;
  @Prop()
  @Field()
  phone: string;
  @Prop()
  @Field(() => [String])
  documents: string[];
  @Prop()
  @Field()
  email: string;
  @Prop()
  @Field()
  location: string;
  @Prop()
  @Field()
  about: string;
  @Prop()
  @Field()
  desire: desireType;
  @Prop()
  @Field(() => [educationType])
  education: educationType[];
  @Prop()
  @Field(() => [experiencesType])
  experiences: experiencesType[];
  @Prop()
  @Field(() => [String])
  skills: string[];
  @Prop()
  @Field(() => [String])
  languages: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
