import { Field, ArgsType } from '@nestjs/graphql';
@ArgsType()
export class DesireArgs {
  @Field()
  job: string;
  @Field()
  occupation: string;
}
@ArgsType()
export class UserArgs {
  @Field()
  name: string;
  @Field()
  age: string;
  @Field()
  birthDay: string;
  @Field()
  phone: string;
  // @Field(() => DesireArgs)
  // desire: DesireArgs;
}
