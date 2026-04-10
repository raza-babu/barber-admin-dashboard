import { Table, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useGetAllSubscriberQuery } from "../redux/api/manageApi";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const PremiumSubscriber = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const { searchTerm } = useDebounce({ searchQuery, setCurrentPage }); //debounce handled
  const {
    data: subscriber,
    isLoading,
    isFetching,
  } = useGetAllSubscriberQuery({
    searchTerm: searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const meta = subscriber?.meta || {};
  // Transform API data into table-friendly format
  const tableData = subscriber?.data?.map((item, index) => ({
    key: item.id,
    sl: Number(index + 1) + (meta?.page - 1) * pageSize,
    name: item.fullName,
    email: item.email,
    phone: item.phoneNumber,
    joiningDate: new Date(item.startDate).toLocaleDateString(),
    subscriptionTitle: item.subscriptionTitle,
    subscriptionEnd: new Date(item.subscriptionEnd).toLocaleDateString(),
    subscriptionPrice: item.subscriptionPrice,
    interval: item.offer?.duration,
    shopName: item.shopName,
    fee: `$${item.offer?.price} ${item.offer?.currency?.toUpperCase()}`,
    lastSubscriptionPaymentDate: item?.lastSubscriptionPaymentDate ? new Date(item.lastSubscriptionPaymentDate).toLocaleDateString() : "N/A",
    status: item.paymentStatus === "COMPLETED" ? "Paid" : "Due",
  }));

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    // {
    //   title: "Joining Date",
    //   dataIndex: "joiningDate",
    //   key: "joiningDate",
    // },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
    },
    {
      title: "Subscription Title",
      dataIndex: "subscriptionTitle",
      key: "subscriptionTitle",
    },
    {
      title: "Subscription End",
      dataIndex: "subscriptionEnd",
      key: "subscriptionEnd",
    },
    // {
    //   title: "Plan",
    //   dataIndex: "subscriptionPlan",
    //   key: "subscriptionPlan",
    // },
    // {
    //   title: "Interval",
    //   dataIndex: "interval",
    //   key: "interval",
    //   render: (interval) => <span className="text-[#D17C51]">{interval}</span>,
    // },
    {
      title: "Subscription Price",
      dataIndex: "subscriptionPrice",
      key: "subscriptionPrice",
      render: (price) => (
        <span>£{price}</span>
      )
    },
    {
      title: "Last Payment",
      dataIndex: "lastSubscriptionPaymentDate",
      key: "lastSubscriptionPaymentDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`border px-4 py-1 rounded-full text-sm ${
            status === "Paid"
              ? "border-green-500 text-green-600"
              : "border-orange-500 text-orange-500"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between">
        <Navigate title={"Premium Subscribers"} />
        <div>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-1 rounded-lg bg-white"
          />
        </div>
      </div>

      <div className="p-2">
        <div className="rounded-md overflow-hidden">
          <Table
            loading={isLoading || isFetching}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowClassName="border-b border-gray-300"
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
      {meta?.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={subscriber?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PremiumSubscriber;
