import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    UserModule,
    JobsModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@codehire-remote.sxeqw9q.mongodb.net/?retryWrites=true&w=majority',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      formatResponse: (response, requestContext) => {
        if (response.errors) {
          delete response.data;
        }
        return response;
      },
    }),
  ],
})
export class AppModule {}
