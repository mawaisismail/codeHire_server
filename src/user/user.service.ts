import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './models/user.entity';
import { UserArgs } from './dto/user.args';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly user: Model<UserEntity>,
  ) {}

  async getUserById(id: string) {
    try {
      const data = await this.user.findById(id);
      if (data) return data;
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }
  async createUser(userArgs: UserArgs) {
    console.log('userArgs', userArgs);
    try {
      const user = await this.user.create({
        ...userArgs,
      });
      if (user) {
        console.log(user);
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
