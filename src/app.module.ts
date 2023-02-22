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
    MongooseModule.forRoot('mongodb://localhost:27017', {
      auth: {
        username: 'root',
        password: 'root',
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
})
export class AppModule {}
