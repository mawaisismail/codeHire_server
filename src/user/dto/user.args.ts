import { Field, InputType } from '@nestjs/graphql';
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
export class UserArgs {
  @Field()
  name: string;
  @Field()
  age: string;
  @Field()
  birthDay: string;
  @Field()
  phone: string;
  @Field(() => DesireArgs)
  desire: DesireArgs;
}
