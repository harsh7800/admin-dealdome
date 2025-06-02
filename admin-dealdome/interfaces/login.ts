// types/auth.ts

export interface LoginResponse {
  statusCode: number;
  timestamp: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface Document {
  name: string;
  value: string;
  url: string;
}

export interface AuthUser {
  documents: Document[];
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  countryCode: string;
  email: string;
  age: number;
  status: string;
  hashedPassword: string;
  role: {
    name: string;
    permissions: {
      [key: string]: string;
    };
    _id: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  resetPasswordExpires: string;
  resetPasswordToken: string;
  image: string;
  isSeller: boolean;
  deviceKey: string;
}
