/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const BarberTable = ({
  barbers,
  isLoading,
  isFetching,
  meta,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {

  const tableData = useMemo(() => {
    return barbers?.map((item, index) => ({
      key: item.userId,
      serial: Number(index + 1) + (meta?.page - 1) * pageSize,
      barberName: item.fullName,
      avatar:
        item.portfolio?.[0] ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.fullName),
      shop: item.shopName || "N/A",
      contact: item.phoneNumber || "N/A",
      hourlyRate: item.hourlyRate,
      status: item.status,
    }));
  }, [barbers]);

  const columns = [
    {
      title: "S.N",
      dataIndex: "serial",
      key: "serial"
    },
    {
      title: "Barber Name",
      dataIndex: "barberName",
      key: "barberName",
      render: (text, record) => (
        <Link to={`/dashboard/barber/barberDetails/${record.key}`}>
          <div className="flex items-center gap-2">
            <img
              src={record.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{text}</span>
          </div>
        </Link>
      ),
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Salary/hour",
      dataIndex: "hourlyRate",
      key: "sales",
      render: (val) => <>{val ? `£${val}` : "N/A"}</>,
    },
  ];

  return (
    <>
      <div className="rounded-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isFetching}
          pagination={false}
          rowClassName="border-b border-gray-300"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default BarberTable;
