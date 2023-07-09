import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyEntity } from '../../company/models/company.entity';

@Schema()
@ObjectType('ChatMessage')
export class ChatMessageEntity {
  @Prop()
  @Field()
  jobId: string;

  @Prop()
  @Field({ nullable: true })
  content: string;

  @Prop()
  @Field({ nullable: true })
  senderId: string;

  @Prop()
  @Field({ nullable: true })
  createdAt: Date;
}

export const chatSchema = SchemaFactory.createForClass(ChatMessageEntity);
