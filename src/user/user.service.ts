import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './models/user.entity';
import { UserInputType } from './dto/user.args';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, UserType } from './interfaces/tokenPayload';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly user: Model<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async getUserById(id: string, isForJob = false) {
    try {
      const data = await this.user.findOne({ uid: id });
      if (data) return data;
      if (isForJob) return null;
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
  getToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload);
  }
  async createUser(userInputType: UserInputType) {
    try {
      const user: UserEntity = await this.user.create({
        ...userInputType,
      });
      if (user) {
        user.token = this.getToken({
          userEmail: user.email,
          userID: user.id,
          userName: user.name,
          usertype: UserType.USER,
        });
        return user;
      }
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const data = await this.user.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        return { success: 'User Deleted Successfully' };
      }
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
}
