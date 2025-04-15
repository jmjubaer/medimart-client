export type IUser = {
  _id?: string;
  name: string;
  email: string;
  phone?:string;
  password: string;
  passwordChangedAt?: Date;
  status?: 'active' | 'deactivated';
  role?: 'admin' | 'customer';
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};