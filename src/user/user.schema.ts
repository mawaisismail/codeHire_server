import { Schema } from 'mongoose';
export const UserSchema = new Schema({
  name: String,
  age: String,
  email: String,
  city: String,
  country: String,
  latitude: String,
  longitude: String,
  birthDay: String,
  userType: Number,
  profileUrl: Number,
  phone: String,
  desire: {
    employmentType: {
      type: String,
      default: '',
    },
    annualSalary: String,
    occupation: { type: [String], default: [] },
  },
  address: {
    zipcode: {
      type: String,
      default: '',
    },
    address1: {
      type: String,
      default: '',
    },
    address2: {
      type: String,
      default: '',
    },
  },
});
