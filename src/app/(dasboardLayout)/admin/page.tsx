import OverviewPage from "@/components/pages/admin";
import { getOverview } from "@/services/OrderServices";

const AdminDashboardPage = async () => {
    const { data } = await getOverview();
    return (
        <div>
            <OverviewPage data={data} />
        </div>
    );
};

export default AdminDashboardPage;
