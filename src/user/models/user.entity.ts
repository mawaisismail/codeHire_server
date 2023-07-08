import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
export class desireType {
  @Field(() => [String], { nullable: true })
  @Prop()
  desiredOccupation: string[];
  @Prop()
  @Field({ nullable: true })
  firstChoiceOfWork: string;
  @Prop()
  @Field({ nullable: true })
  secondChoiceOfWork: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  employmentType: string[];
  @Prop()
  @Field({ nullable: true })
  annualSalary: string;
  @Prop()
  @Field({ nullable: true })
  previousSalary: string;
}

@ObjectType()
export class educationType {
  @Prop()
  @Field({ nullable: true })
  degree: string;
  @Prop()
  @Field({ nullable: true })
  institute: string;
  @Prop()
  @Field({ nullable: true })
  year: string;
  @Prop()
  @Field({ nullable: true })
  info: string;
}
@ObjectType()
export class addressType {
  @Prop()
  @Field({ nullable: true })
  Country: string;
  @Prop()
  @Field({ nullable: true })
  postalCode: string;
  @Prop()
  @Field({ nullable: true })
  building: string;
}

@ObjectType()
export class experiencesType {
  @Prop()
  @Field({ nullable: true })
  position: string;
  @Prop()
  @Field({ nullable: true })
  institute: string;
  @Prop()
  @Field({ nullable: true })
  year: string;
  @Prop()
  @Field({ nullable: true })
  info: string;
}
@Schema()
@ObjectType('User')
export class UserEntity {
  @Prop()
  @Field({ nullable: true })
  uid: string;
  @Prop()
  @Field({ nullable: true })
  first_name: string;
  @Prop()
  @Field({ nullable: true })
  last_name: string;
  @Prop()
  @Field({ nullable: true })
  userType: string;
  @Prop()
  @Field({ nullable: true })
  profileImageURL: string;
  @Prop()
  @Field({ nullable: true })
  userName: string;
  @Prop()
  @Field({ nullable: true })
  name: string;
  @Prop()
  @Field({ nullable: true })
  currentOccupation: string;
  @Prop()
  @Field({ nullable: true })
  age: string;
  @Prop()
  @Field({ nullable: true })
  birthday: string;
  @Prop()
  @Field({ nullable: true })
  phone: string;
  @Prop()
  @Field({ nullable: true })
  otherEmail: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  documents: string[];
  @Prop()
  @Field({ nullable: true })
  email: string;
  @Prop()
  @Field({ nullable: true })
  location: string;
  @Prop()
  @Field({ nullable: true })
  about: string;
  @Prop()
  @Field(() => desireType, { nullable: true })
  desire: desireType;
  @Prop()
  @Field({ nullable: true })
  profession: string;
  @Prop()
  @Field(() => [String], { nullable: true })
  otherOccupation: string[];
  @Prop()
  @Field(() => [educationType], { nullable: true })
  education: educationType[];
  @Prop()
  @Field(() => addressType, { nullable: true })
  address: addressType;
  @Prop()
  @Field(() => [experiencesType], { nullable: true })
  experiences: experiencesType[];
  @Prop()
  @Field(() => [String], { nullable: true })
  skills: string[];
  @Prop()
  @Field(() => [String], { nullable: true })
  languages: string[];
  @Field({ nullable: true })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
