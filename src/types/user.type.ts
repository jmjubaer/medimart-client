export interface IUser {
    name: string;
    email: string;
    isActive?: boolean;
    role: "customer" | "admin";
    iat?: number;
    exp?: number;
  }