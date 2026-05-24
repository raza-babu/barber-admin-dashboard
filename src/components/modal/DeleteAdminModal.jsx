import { Modal } from "antd";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { useDeleteAdminAccessMutation } from "../../page/redux/api/manageApi";
import { RiDeleteBin6Line } from "react-icons/ri";



const DeleteAdminModal = ({ userId } ) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAdmin, { isLoading }] =
    useDeleteAdminAccessMutation();

  const handleDelete = async () => {
    try {
      await deleteAdmin(userId).unwrap();
      message.success("Admin is deleted successfully");
      setModalOpen(false)
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  return (
    <>

       <button
                   onClick={() => setModalOpen(true)}
                  className="bg-red-500 p-2 rounded text-xl text-white cursor-pointer"
                  >
                    <RiDeleteBin6Line />
        </button>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={false}
        closable={false}
      >
        <div className="rounded-md">
          <div className="">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                Are you sure, you want to delete?
              </h3>
            </div>
          </div>
          <div>
            <div className="flex justify-end space-x-2 pt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-4 cursor-pointer py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                {isLoading? (
                  <>
                    <CgSpinnerTwo className="animate-spin" fontSize={16} />
                  </>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAdminModal;