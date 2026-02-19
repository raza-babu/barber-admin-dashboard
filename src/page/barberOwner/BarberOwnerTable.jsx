import { Table, Tag } from "antd";
import { useMemo } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from "react-router-dom";
import OwnerBlockSwitch from "../../components/switch/OwnerBlockSwitch";

const BarberOwnerTable = ({ barberOwners, isLoading, isFetching }) => {
  const tableData = useMemo(() => {
    return barberOwners?.map((item, index) => ({
      key: item.id || index,
      id: index + 1,
      shopName: item.shopName,
      avatar: item.shopLogo,
      city: item.shopAddress,
      rating: "5.0",
      contact: item.shopPhoneNumber || item.phoneNumber,
      status: item.isVerified ? "ACTIVE" : "INACTIVE",
      isVerified: item.isVerified,
    }));
  }, [barberOwners]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <Link to={`/dashboard/barberOwner/barberDetails/${record.key}`}>
            <span>{text}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div className="flex items-center gap-1">
          <span className="text-[#FFB400] text-xl">
            <MdOutlineStarPurple500 />
          </span>
          {rating}
        </div>
      ),
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
      render: (status) => (
        <Tag
          className="px-4 py-1 rounded-full"
          color={status === "ACTIVE" ? "green" : "red"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Block / Unblock",
      key: "blocked",
      render: (_, record) => <OwnerBlockSwitch record={record} />,
    },
  ];

  return (
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
  );
};

export default BarberOwnerTable;
