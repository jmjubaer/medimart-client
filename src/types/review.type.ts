import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export type IReview = {
    _id: string;
    reviewer: IUser;
    product: IProduct;
    rating: number;
    comment: string;
    createdAt: Date;
};
export type ICreateReview = {
    reviewer: string;
    product: string;
    rating: number;
    comment: string;
};
