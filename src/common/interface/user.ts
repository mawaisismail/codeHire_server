import { UserType } from '../../user/interfaces/tokenPayload';

export interface IUser {
  userEmail: string;
  userID: string;
  userName: string;
  usertype: UserType;
}
