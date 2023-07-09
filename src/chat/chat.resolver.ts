import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  Context,
  Root,
} from '@nestjs/graphql';
import { ChatMessageEntity } from './models/chat-message.entity';
import { ChatService } from './chat.service';
import { EVENT_MESSAGE_SENT, getAsyncIterator } from './utils/pubSub.manager';
@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
  @Query(() => [ChatMessageEntity])
  async messages(): Promise<ChatMessageEntity[]> {
    return this.chatService.listMessages();
  }

  @Mutation(() => ChatMessageEntity)
  async messageSend(
    @Args('jobId') jobId: string,
    @Args('content') content: string,
    @Args('senderId') senderId: string,
  ): Promise<ChatMessageEntity> {
    const newMessage: ChatMessageEntity = {
      jobId,
      content,
      senderId,
      createdAt: new Date(),
    };
    return this.chatService.sendMessage(newMessage);
  }

  @Subscription(() => ChatMessageEntity)
  async messageSent(@Context() { payload }: any) {
    console.log(payload);
    console.log('msg send', getAsyncIterator(EVENT_MESSAGE_SENT));
    return getAsyncIterator(EVENT_MESSAGE_SENT);
  }

  @Subscription(() => ChatMessageEntity, {
    filter: (payload: any, variables: any, context: any) => {
      console.log('variable', variables);
      console.log('payload', payload);
      console.log('context', context);
      return payload.messageSent.jobId === variables.jobId;
    },
    resolve: (value) => {
      console.log('value', value);
      return value as any;
    },
  })
  async messageSentByJobId(@Root() payload: any, @Args('jobId') jobId: string) {
    return await getAsyncIterator(EVENT_MESSAGE_SENT);
  }
}
