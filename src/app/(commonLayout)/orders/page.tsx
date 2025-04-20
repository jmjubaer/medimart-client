import ManageOrder from "@/components/pages/order";
import { getUserOrders } from "@/services/OrderServices";

const OrderPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { userId } = await searchParams;
    console.log(userId);
    const data =await getUserOrders(userId as string);
    console.log(data);
    return (
        <div>
            <ManageOrder />
        </div>
    );
};

export default OrderPage;
