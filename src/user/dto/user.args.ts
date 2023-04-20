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
  @Field({ nullable: true })
  userInfo: string;
}
