export enum UserType {
  USER = 'USER',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}
export interface ITokenPayload {
  userID: string;
  userName: string;
  userEmail: string;
  usertype: UserType;
}
