import PendingOrders from "@components/Admin/Orders/PendingOrders";

export const dynamic = "force-dynamic";

const AdminOrdersPage = () => {
  return (
    <div className="bg-EggShell">
      <PendingOrders />
    </div>
  );
};

export default AdminOrdersPage;
