import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType('docs')
export class DocsEntity {
  @Prop()
  @Field({ nullable: true })
  uid: string;
  @Prop()
  @Field({ nullable: true })
  url: string;
  @Prop()
  @Field({ nullable: true })
  name: string;
}

export const docsSchema = SchemaFactory.createForClass(DocsEntity);
