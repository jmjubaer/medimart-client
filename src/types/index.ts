export * from "./user.type";
export * from "./product.type";
export * from "./instrument.type";

export type IMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};
export type TQueryParam = {
    name: string;
    value: string | number | boolean;
};
