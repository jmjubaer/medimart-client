export * from "./user.type";
export * from "./product.type";
export * from "./instrument.type";

export type IMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};
export type IQueryParam = {
    name: string;
    value: string | number | boolean;
};
export type IContact = {
    _id: string;
    name: string;
    contact: string;
    message: string;
   
};
