import { IMedicine } from "./medicines.type";
import { IUser } from "./user.type";

export interface IProduct {
    medicine: IMedicine;
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
  }
  export interface IOrder {
    key?: string;
    _id: string;
    user: IUser;
    products: IProduct[];
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
    createdAt: Date
  }