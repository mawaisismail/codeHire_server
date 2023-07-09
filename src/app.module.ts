import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';
import { CompanyModule } from './company/company.module';
import { ChatModule } from './chat/chat.module';
import { UploadModule } from './upload/upload.module';
import { DocsModule } from './docs/docs.module';

@Module({
  imports: [
    UserModule,
    JobsModule,
    CompanyModule,
    ChatModule,
    UploadModule,
    DocsModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@codehire-remote.sxeqw9q.mongodb.net/?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
      formatResponse: (response) => {
        if (response.errors) {
          delete response.data;
        }
        return response;
      },
      context: async ({ connection }) => {
        if (!connection) {
          return undefined;
        }

        if (!connection?.context?.user) {
          return undefined;
        }

        return {
          payload: connection?.context,
        };
      },
    }),
    // RedisModule.register({
    //   host: process.env.REDIS_HOST,
    //   port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    // }),
    // ChatModule,
  ],
})
export class AppModule {}
