import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { CompanyEntity, companySchema } from './models/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '600000000s' },
    }),
    MongooseModule.forFeature([
      {
        name: CompanyEntity.name,
        schema: companySchema,
      },
    ]),
  ],
  providers: [CompanyResolver, CompanyService, JwtStrategy],
  exports: [CompanyService],
})
export class CompanyModule {}
