import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IOrderProduct {
    product: IProduct;
    quantity: number;
    prescription: string;
}
export interface IDeliveryInfo {
    name: string;
    phoneNumber: string;
    localAddress: string;
    city: string;
    district: string;
    thana: string;
    postalCode: number;
    prescription?: string;
}
export interface IOrder {
    key?: string;
    _id: string;
    user: IUser;
    products: IOrderProduct[];
    totalPrice: number;
    status: "Pending" | "Reject" | "Processing" | "Shipped" | "Delivered";
    rejectNotes?: string;
    deliveryInfo?: IDeliveryInfo;
    deliveryOptions?: "Standard" | "Express" | "Pickup from Store";
    paymentMethod: "COD" | "surjopay";
    paymentStatus: "unpaid" | "paid";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    createdAt: Date;
}

export interface IOrderCartItem {
    product: string;
    quantity: number;
    prescription?: string;
}
export interface ICreateOrder {
    user: string;
    products: IOrderCartItem[];
    deliveryInfo?: IDeliveryInfo;
    deliveryOptions?: "Standard" | "Express" | "Pickup from Store";
    paymentMethod: "COD" | "surjopay";
}
