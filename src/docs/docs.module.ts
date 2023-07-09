import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DocsEntity, docsSchema } from './model/docs.entity';
import { DocsResolver } from './docs.resolver';
import { DocsService } from './docs.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '600000000s' },
    }),
    MongooseModule.forFeature([
      {
        name: DocsEntity.name,
        schema: docsSchema,
      },
    ]),
  ],
  providers: [DocsResolver, DocsService],
  exports: [],
})
export class DocsModule {}
