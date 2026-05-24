/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Tag } from "antd";
import BlockSwitch from "../../components/switch/BlockSwitch";
import { useEffect, useMemo } from "react";

const PaymentTable = ({
  payments,
  isLoading,
  isFetching,
  meta,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [currentPage, meta, setCurrentPage]);

  const tableData = useMemo(() => {
    return payments?.map((item, index) => ({
      key: item.id || index,
      id: Number(index + 1) + (meta?.page - 1) * pageSize,
      customerName: item.userName,
      userEmail: item.userEmail,
      barbarName: item.barbarName,
      avatar:
        item.image ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.fullName),
      paymentAmount: item.paymentAmount || "N/A",
      paymentDate: item.paymentDate || "N/A",
      status: item.status,
      blocked: item.status,
    }));
  }, [payments]);

  const columns = [
    {
      title: "S.N.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (text, record) => (
        <div className="flex flex-col gap-2">
          <span className="font-semibold">{text}</span>
          <span>{record?.userEmail}</span>
        </div>
      ),
    },
    {
      title: "Barbar Name",
      dataIndex: "barbarName",
      key: "barbarName",
    },
    {
      title: "Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      render: (amount) => <span>£{amount}</span>,
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => <span>{date?.split('T')[0] || "N/A"}</span>
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const STATUS_COLORS = {
          ACTIVE: "green",
          BLOCKED: "red",
          PENDING: "orange",
        };

        return (
          <Tag
            className="px-4 py-1 rounded-full"
            color={STATUS_COLORS[status] || "default"}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <div className=" rounded-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          pagination={false}
          rowClassName=" border-b border-gray-300"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default PaymentTable;
