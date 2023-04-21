import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, UserType } from './interfaces/tokenPayload';
import { IUser } from '../common/interface/user';

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
      throw new NotFoundException(e.message);
    }
  }
  getToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload);
  }
  async createUser(userInputType) {
    try {
      const user: UserEntity = await this.user.create({
        ...JSON.parse(userInputType.userInfo),
      });
      if (user) {
        user.token = this.getToken({
          userEmail: user.email,
          userID: user.uid,
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

  async updateUser(userInputType, user: IUser): Promise<UserEntity> {
    try {
      const updatedUser = await this.user.updateOne(
        { uid: user.userID },
        {
          ...JSON.parse(userInputType.userInfo),
        },
        { new: true },
      );
      const data = await this.getUserById(user.userID);

      if (data) return data;
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const data = await this.user.deleteOne({ uid: id });
      if (data.deletedCount > 0) {
        return { success: 'User Deleted Successfully' };
      }
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
}
