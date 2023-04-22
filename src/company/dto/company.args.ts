import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyArgs {
  @Field()
  companyInfo: string;
}
