/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
import { useMemo } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from "react-router-dom";
// import OwnerBlockSwitch from "../../components/switch/OwnerBlockSwitch";
import ChangeStatusModal from "../../components/modal/ChangeStatusModal";

const BarberOwnerTable = ({
  barberOwners,
  isLoading,
  isFetching,
  meta,
  pageSize,
}) => {
  const tableData = useMemo(() => {
    return barberOwners?.map((item, index) => ({
      key: index,
      id: item.id,
      serial: Number(index + 1) + (meta?.page - 1) * pageSize,
      shopName: item.shopName,
      email: item.email,
      avatar: item.shopLogo,
      city: item.shopAddress !=="Unknown Address" ? item.shopAddress : "N/A",
      rating: item?.ratingCount,
      contact: item.phoneNumber || "N/A",
      status: item.isVerified ? "ACTIVE" : "BLOCKED",
      isVerified: item.isVerified,
    }));
  }, [barberOwners]);


  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
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
          <Link to={`/dashboard/barberOwner/barberDetails/${record.id}`}>
            <span>{text}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
          {rating.toFixed(2)}
        </div>
      ),
    },
    {
      title: "Verification Status",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified, record) => (
        <>
          <ChangeStatusModal isVerified={isVerified} userId={record.id} />
        </>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => (
    //     <Tag
    //       className="px-4 py-1 rounded-full"
    //       color={status === "ACTIVE" ? "green" : "red"}
    //     >
    //       {status}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: "Block / Unblock",
    //   key: "blocked",
    //   render: (_, record) => <OwnerBlockSwitch record={record} />,
    // },
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
