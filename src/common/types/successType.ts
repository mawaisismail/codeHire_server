import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessType {
  @Field()
  success: string;
}
