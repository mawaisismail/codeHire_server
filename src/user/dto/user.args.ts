import { Field, InputType } from '@nestjs/graphql';
import { UserType } from '../interfaces/tokenPayload';
@InputType()
export class DesireArgs {
  @Field(() => [String], { nullable: true })
  occupation: string[];
  @Field()
  employmentType: string;
  @Field({ nullable: true })
  annualSalary: string;
}
@InputType()
export class UserInputType {
  @Field()
  uid: string;
  @Field()
  email: string;
  @Field()
  userType: UserType;
  @Field({ nullable: true })
  profileImageURL: string;
  @Field({ nullable: true })
  userName: string;
  // @Field()
  // age: string;
  // @Field()
  // birthDay: string;
  // @Field()
  // phone: string;
  // // @Field(() => DesireArgs)
  // // desire: DesireArgs;
}
