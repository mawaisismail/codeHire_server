import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('Company')
export class CompanyEntity {
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
  email: string;
  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field({ nullable: true })
  owner: string;
  @Prop()
  @Field({ nullable: true })
  coverImage: string;
  @Prop()
  @Field({ nullable: true })
  total_employee: string;
  @Prop()
  @Field({ nullable: true })
  location: string;
  @Prop()
  @Field({ nullable: true })
  website: string;
  @Prop()
  @Field({ nullable: true })
  phone: string;
  @Prop()
  @Field({ nullable: true })
  established: string;
  @Prop()
  @Field({ nullable: true })
  about: string;
  @Field()
  token: string;
}

export const companySchema = SchemaFactory.createForClass(CompanyEntity);