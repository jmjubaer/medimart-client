import ManageOrder from "@/components/pages/order";
import { getUserOrders } from "@/services/OrderServices";

const OrderPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const { userId } = await searchParams;
    const { data } = await getUserOrders(userId as string);
    return (
        <div>
            <ManageOrder data={data} />
        </div>
    );
};

export default OrderPage;
