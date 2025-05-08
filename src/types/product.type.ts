export interface IProduct {
    _id: string
    name: string;
    type: "medicine" | "instrument";
    description: string;
    price: number;
    quantity: number;

    requiredPrescription?: boolean;
    symptoms?: string;
    expiryDate?: Date;

    brand?: string;
    warrantyPeriod?: string;
    features?: string[];

    usageInstructions?: string;
    image: string;
    manufacturerDetails: {
        name: string;
        contact: string;
        location: string;
    };
}
