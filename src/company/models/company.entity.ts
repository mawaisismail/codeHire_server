import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class workingHoursType {
  @Prop()
  @Field({ nullable: true })
  monday: string;
  @Prop()
  @Field({ nullable: true })
  tuesday: string;
  @Prop()
  @Field({ nullable: true })
  wednesday: string;
  @Prop()
  @Field({ nullable: true })
  thursday: string;
  @Prop()
  @Field({ nullable: true })
  friday: string;
  @Prop()
  @Field({ nullable: true })
  saturday: string;
  @Prop()
  @Field({ nullable: true })
  sunday: string;
}

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
  @Field({ nullable: true })
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
  @Field({ nullable: true })
  token: string;
  @Prop()
  @Field(() => workingHoursType, { nullable: true })
  workingHours: workingHoursType;
}

export const companySchema = SchemaFactory.createForClass(CompanyEntity);
