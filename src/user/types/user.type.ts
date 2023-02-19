import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class desireType {
  @Field(() => [String], { nullable: true })
  occupation: string[];
  @Field()
  employmentType: string;
  @Field({ nullable: true })
  annualSalary: string;
}

@ObjectType('User')
export class UserType {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  age: string;
  @Field()
  birthDay: string;
  @Field()
  phone: string;
  @Field()
  desire: desireType;
}
