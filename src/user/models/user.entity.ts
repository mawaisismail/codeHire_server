import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
export class desireType {
  @Field(() => [String])
  @Prop()
  desiredOccupation: string[];
  @Prop()
  @Field()
  firstChoiceOfWork: string;
  @Prop()
  @Field()
  secondChoiceOfWork: string;
  @Prop()
  @Field(() => [String])
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
  @Field()
  degree: string;
  @Prop()
  @Field()
  institute: string;
  @Prop()
  @Field()
  year: string;
  @Prop()
  @Field()
  info: string;
}
@ObjectType()
export class addressType {
  @Prop()
  @Field()
  Country: string;
  @Prop()
  @Field()
  postalCode: string;
  @Prop()
  @Field()
  building: string;
}

@ObjectType()
export class experiencesType {
  @Prop()
  @Field()
  position: string;
  @Prop()
  @Field()
  institute: string;
  @Prop()
  @Field()
  year: string;
  @Prop()
  @Field()
  info: string;
}
@Schema()
@ObjectType('User')
export class UserEntity {
  @Field(() => ID)
  id: string;
  @Prop()
  @Field({ nullable: true })
  uid: string;
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
  @Field()
  currentOccupation: string;
  @Prop()
  @Field()
  age: string;
  @Prop()
  @Field()
  birthday: string;
  @Prop()
  @Field()
  phone: string;
  @Prop()
  @Field()
  otherEmail: string;
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
  @Field(() => desireType)
  desire: desireType;
  @Prop()
  @Field()
  profession: string;
  @Prop()
  @Field(() => [String])
  otherOccupation: string[];
  @Prop()
  @Field(() => [educationType])
  education: educationType[];
  @Prop()
  @Field(() => [addressType])
  address: addressType;
  @Prop()
  @Field(() => [experiencesType])
  experiences: experiencesType[];
  @Prop()
  @Field(() => [String])
  skills: string[];
  @Prop()
  @Field(() => [String])
  languages: string[];
  @Field()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
