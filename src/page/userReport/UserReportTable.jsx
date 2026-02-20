import { Table, Tag } from "antd";
import { useMemo } from "react";
import ReplyUserModal from "../../components/modal/ReplyUserModal";

const UserReportTable = ({
  reports,
  isLoading,
  isFetching,
  meta,
  pageSize,
}) => {
  const tableData = useMemo(() => {
    return reports.map((item, index) => ({
      key: item.reportId,
      id: item.userId,
      serial: Number(index + 1) + (meta?.page - 1) * pageSize,
      fullName: item.userName,
      contact: item.userPhoneNumber ? `${item.userPhoneNumber}` : "No contact",
      region: item.userAddress || "N/A",
      status: item.status,
      message: item.message,
      type: item.type,
    }));
  }, [reports]);

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      render: (text, record) => (
        <div>
          <div className="font-semibold">{record.fullName}</div>
          <div className="text-xs text-gray-500">{record.message}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Region",
      dataIndex: "region",
      render: (text) => (
        <span className="text-gray-500">{text || "Not provided"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const color =
          status === "ACTIVE"
            ? "green"
            : status === "CLOSED"
              ? "volcano"
              : "blue";
        return (
          <Tag color={color} className="rounded-full px-3">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <ReplyUserModal record={record} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-2">
        <div className="rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading || isFetching}
            pagination={false}
            rowClassName="border-b border-gray-200"
            scroll={{ x: 900 }}
          />
        </div>
      </div>
    </>
  );
};

export default UserReportTable;
