import { Field, InputType } from '@nestjs/graphql';

@InputType()
@InputType()
export class CreateCompanyArgs {
  @Field()
  companyInfo: string;
}
