import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ChatMessageEntity, chatSchema } from './models/chat-message.entity';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ApplyJobs, ApplyJobSchema } from '../jobs/models/jobs.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '600000000s' },
    }),
    MongooseModule.forFeature([
      {
        name: ChatMessageEntity.name,
        schema: chatSchema,
      },
      {
        name: ApplyJobs.name,
        schema: ApplyJobSchema,
      },
    ]),
  ],
  providers: [ChatResolver, ChatService, JwtStrategy],
})
export class ChatModule {}
