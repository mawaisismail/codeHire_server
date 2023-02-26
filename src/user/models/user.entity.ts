import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@ObjectType()
export class desireType {
  @Field(() => [String])
  @Prop()
  occupation: string[];
  @Prop()
  @Field()
  employmentType: string;
  @Prop()
  @Field({ nullable: true })
  annualSalary: string;
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
  @Field()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
