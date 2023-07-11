import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveUserEntity, UserEntity } from './models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, UserType } from './interfaces/tokenPayload';
import { IUser } from '../common/interface/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private readonly user: Model<UserEntity>,
    @InjectModel(SaveUserEntity.name)
    private readonly save_users: Model<SaveUserEntity>,
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

  async getFilterUser(search: any) {
    try {
      const {
        about,
        education,
        currentOccupation,
        annualSalary,
        skills,
        firstChoiceOfWork,
      } = JSON.parse(search);
      const query: any = {};
      // Add filters based on user input
      if (about) {
        query.about = { $regex: new RegExp(about, 'i') }; // Case-insensitive regex match for 'about' field
      }

      if (education) {
        query['education.name'] = { $regex: new RegExp(education, 'i') }; // Case-insensitive regex match for 'education' field
      }

      if (currentOccupation) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query.currentOccupation = {
          $regex: new RegExp(currentOccupation, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (annualSalary) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['desire.annualSalary'] = {
          $regex: new RegExp(annualSalary, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (skills) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['skills'] = {
          $regex: new RegExp(skills, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      if (firstChoiceOfWork) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        query['desire.firstChoiceOfWork'] = {
          $regex: new RegExp(firstChoiceOfWork, 'i'),
        }; // Case-insensitive regex match for 'currentOccupation' field
      }

      return await this.user.find(query);
      throw new NotFoundException('User Does Not Exist');
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async getAllUsers() {
    try {
      return await this.user.find();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
  async saveUsers(id: string, user: IUser) {
    try {
      const isSaveed = await this.save_users.find({
        uid: user.userID,
        user_id: id,
      });
      if (isSaveed) {
        throw new UnprocessableEntityException('Already Saved');
      }
      return await this.save_users.create({
        id: uuidv4(),
        user_id: id,
        uid: user.userID,
      });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async cancelSaveUsers(id: string, user: IUser) {
    try {
      const isSaveed = await this.save_users.find({
        uid: user.userID,
        user_id: id,
      });
      if (isSaveed) {
        return await this.save_users.deleteOne({
          user_id: id,
          uid: user.userID,
        });
      }
      throw new UnprocessableEntityException('Already Saved');
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async getAllSaveUser(user: IUser) {
    try {
      const saveUser = await this.save_users.find({
        uid: user.userID,
      });
      console.log(saveUser.map((item) => item.user_id));
      if (saveUser.length === 0) {
        return [];
      }
      const ids = saveUser.map((item) => item.user_id);
      const saveUserData = await this.user.aggregate([
        {
          $match: {
            uid: { $in: ids },
          },
        },
      ]);
      return saveUserData;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async getLoginUser(uid: string) {
    try {
      const user = await this.user.findOne({ uid: uid });
      if (user) {
        user.token = this.getToken({
          userEmail: user.email,
          userID: user.uid,
          userName: user.name,
          usertype: UserType.USER,
        });
        return user;
      }
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
