export type IUser = {
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    city: string;
    district: string;
    thana: string;
    postalCode: number;
    localAddress: string;
    password: string;
    passwordChangedAt?: Date;
    status?: "active" | "deactivated";
    role?: "admin" | "customer";
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface IAuthUser {
    name: string;
    email: string;
    phone: string;
    exp: number;
    iat: number;
    _id: string;
    role: "customer" | "admin";
    city: string;
    district: string;
    thana: string;
    postalCode: string;
    localAddress: string;
}
