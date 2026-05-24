import { useState } from "react";
import { Table, Space, message, Modal, Pagination } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import {
  useDeleteAddPromotionMutation,
  useGetAddPromotionQuery,
} from "../redux/api/manageApi";
import EditPromotionModal from "./EditPromotionModal";
import placeholder_img from '../../assets/placeholder_img.png';

const Adds = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModal, setViewModal] = useState(false); // 👁 View modal state
  const [viewRecord, setViewRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteAddPromotion] = useDeleteAddPromotionMutation();
  const { data: addPromotionData, isLoading, isFetching } = useGetAddPromotionQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
  ]);

  const meta = addPromotionData?.meta || {};

  const handleEdit = (record) => {
    setSelectedUser(record);
    setEditModal(true);
  };

  const handleView = (record) => {
    setViewRecord(record);
    setViewModal(true);
  };

  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteAddPromotion(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  console.log(addPromotionData?.data)

  const formattedData =
    addPromotionData?.data?.map((item, index) => ({
      key: item.id,
      serial: Number(index + 1) + (meta?.page - 1) * pageSize,
      image: item.images?.[0],
      imageList: item.images,
      title: item.description,
      startDate: new Date(item.startDate).toLocaleDateString(),
      endDate: new Date(item.endDate).toLocaleDateString(),
      date: `${new Date(item.startDate).toLocaleDateString()} - ${new Date(
        item.endDate
      ).toLocaleDateString()}`,
      duration: item.duration,
    })) || [];

    console.log(addPromotionData?.data)

  const columns = [
    {
       title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      render: (text) => <div className="pl-4">{text}</div>,
    },
    {
      title: <div className="text-center">Ads</div>,
      dataIndex: "ads",
      key: "ads",
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex items-start gap-3 bg-gray-100 rounded-md p-2 shadow-sm w-fit">
            {record.image?.endsWith(".mp4") ? (
              <video
                src={record.image}
                controls
                className="w-14 h-14 rounded-md object-cover"
              />
            ) : (
              <img
                src={record.image || placeholder_img}
                alt="Ad"
                className="w-14 h-14 rounded-md object-cover"
              />
            )}

            <div>
              <h4 className="text-sm font-semibold leading-tight">
                {record.title || "Untitled Ad"}
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                {record.date || "No duration"}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                {record.duration || "No duration"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="text-right pr-4">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex justify-end pr-4">
          <Space size="middle">
            {/* 👁 View */}
            <button
              onClick={() => handleView(record)}
              className="bg-blue-500 p-2 rounded text-xl text-white"
            >
              <AiOutlineEye />
            </button>

            {/* ✏️ Edit */}
            <button
              onClick={() => handleEdit(record)}
              className="bg-[#D17C51] p-2 rounded text-xl text-white"
            >
              <FiEdit2 />
            </button>

            {/* 🗑 Delete */}
            <button
              onClick={() => handleDeleteFaq(record?.key)}
              className="bg-red-500 p-2 rounded text-xl text-white"
            >
              <RiDeleteBin6Line />
            </button>
          </Space>
        </div>
      ),
    },
  ];


  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="bg-white p-3 h-[87vh]">
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        rowClassName="border-b border-gray-200"
        scroll={{ x: 600 }}
        loading={isLoading || isFetching}
      />
      {meta?.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={meta?.total || 0}
              onChange={handlePageChange}
            />
          </div>
        )}

      {/* ✏️ Edit Modal */}
      <EditPromotionModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedUser={selectedUser}
      />

      {/* 👁 View Modal */}
      <Modal
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
        title={<span className="text-xl font-semibold">Ad Details</span>}
        width={700}
      >
        {viewRecord && (
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 max-h-[50vh] overflow-y-auto p-1">
              {viewRecord?.imageList?.map((media, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex justify-center items-center h-48">
                  {media?.endsWith(".mp4") ? (
                    <video
                      src={media}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={media}
                      alt={`Ad Media ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{viewRecord.title}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="font-medium text-gray-800 w-24">Date:</span> {viewRecord.date}
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="font-medium text-gray-800 w-24">Duration:</span> {viewRecord.duration}
              </p>
              <p className="text-gray-600 text-sm flex items-start gap-2">
                <span className="font-medium text-gray-800 w-24">Description:</span> 
                <span className="flex-1">{viewRecord.title}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Adds;
