import { Injectable } from '@nestjs/common';
import { ChatMessageEntity } from './models/chat-message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { publishMessageSent } from './utils/pubSub.manager';
import { ApplyJobs } from '../jobs/models/jobs.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessageEntity.name)
    private readonly message: Model<ChatMessageEntity>, // redisService: RedisService,
    @InjectModel(ApplyJobs.name)
    private readonly applyJobModel: Model<ApplyJobs>,
  ) {}

  async sendMessage(message: ChatMessageEntity): Promise<ChatMessageEntity> {
    await this.message.create(message);
    await publishMessageSent(message);
    return message;
  }
  async listMessages(): Promise<ChatMessageEntity[]> {
    return await this.message.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async fetchJobMessages(jobId: string) {
    return await this.applyJobModel.find({
      id: jobId,
    });
  }
}
