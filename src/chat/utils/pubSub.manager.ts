import { ChatUserChangedOnlineStatus } from '../dtos/chatUserChangeOnline.dto';
import { ChatMessageEntity } from '../models/chat-message.entity';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

export const EVENT_CHAT_USER_ENTERED = 'chatUserEntered';
export const EVENT_CHAT_USER_LEAVED = 'chatUserLeaved';
export const EVENT_CHAT_USER_CHANGED_ONLINE_STATUS =
  'chatUserChangedOnlineStatus';
export const EVENT_MESSAGE_SENT = 'messageSent';

export const getAsyncIterator = (type: string) => {
  return pubSub.asyncIterator(type);
};

export const publish = (type: string, payload: any) => {
  return pubSub.publish(type, payload);
};

export const publishUserChangedOnlineStatus = async (
  payload: ChatUserChangedOnlineStatus,
) => {
  return pubSub.publish(EVENT_CHAT_USER_CHANGED_ONLINE_STATUS, {
    [EVENT_CHAT_USER_CHANGED_ONLINE_STATUS]: payload,
  });
};

export const publishMessageSent = async (msg: ChatMessageEntity) => {
  return pubSub.publish(EVENT_MESSAGE_SENT, {
    messageSent: msg,
  });
};
