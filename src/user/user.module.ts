import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
