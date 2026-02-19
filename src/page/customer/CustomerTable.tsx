import { Table, Switch, Tag } from "antd";
import BlockSwitch from "../../components/switch/BlockSwitch";
import { useEffect, useMemo } from "react";

const CustomerTable = ({
  customers,
  isLoading,
  isFetching,
  meta,
  pageSize,
  currentPage,
  setCurrentPage
}) => {
  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [currentPage, meta, setCurrentPage]);

  const tableData = useMemo(() => {
    return customers?.map((item, index) => ({
      key: item.id || index,
      id: Number(index + 1) + (meta?.page - 1) * pageSize,
      customerName: item.fullName,
      avatar:
        item.image ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.fullName),
      city: item.address || "N/A",
      gender: item.gender || "N/A",
      contact: item.phoneNumber || "N/A",
      status: item.status,
      blocked: item.status,
    }));
  }, [customers]);

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
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
    {
      title: "Block / Unblock",
      key: "blocked",
      render: (_, record) => <BlockSwitch record={record} />,
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

export default CustomerTable;
