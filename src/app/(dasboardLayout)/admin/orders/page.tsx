import ManageCustomerOrder from "@/components/pages/admin/order";
import { getAllOrders } from "@/services/OrderServices";

const ManageOrderPage = async () => {
    const { data } = await getAllOrders();
    return (
        <div>
            <ManageCustomerOrder data={data} />
        </div>
    );
};

export default ManageOrderPage;
