import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CompanyEntity } from './models/company.entity';
import { ITokenPayload, UserType } from '../user/interfaces/tokenPayload';
import { IUser } from '../common/interface/user';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyEntity.name)
    private readonly company: Model<CompanyEntity>,
    private jwtService: JwtService,
  ) {}

  getToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload);
  }

  async createCompany(createCompanyArgs) {
    try {
      const company = await this.company.create({
        ...JSON.parse(createCompanyArgs.companyInfo),
      });
      if (company) {
        company.token = this.getToken({
          userEmail: company.email,
          userID: company.uid,
          userName: company.name,
          usertype: UserType.COMPANY,
        });
        return company;
      }
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  async getCompanyId(uid: string): Promise<CompanyEntity> {
    return await this.company.findOne({ uid });
  }

  async updateCompany(userInputType, company: IUser): Promise<CompanyEntity> {
    try {
      await this.company.updateOne(
        { uid: company.userID },
        {
          ...JSON.parse(userInputType.companyInfo),
        },
        { new: true },
      );
      const data = await this.getCompanyId(company.userID);

      if (data) return data;
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
}
