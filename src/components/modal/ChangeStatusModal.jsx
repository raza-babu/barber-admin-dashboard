import { useEffect, useState } from "react";
import { BsFillStopCircleFill } from "react-icons/bs";
import { Clock } from "lucide-react";
import { Modal } from "antd";
import { CgSpinnerTwo } from "react-icons/cg";
import { useApproveSaloonOwnerMutation } from "../../page/redux/api/manageApi";

const ChangeStatusModal = ({ userId, isVerified }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [changeStatus, { isLoading, isSuccess }] =
    useApproveSaloonOwnerMutation();

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);

  const handleClick = () => {
    changeStatus({
      id: userId,
      data: {
        isVerified: true,
      },
    });
  };

  return (
    <>
      <>
        <button
          onClick={() => setModalOpen(true)}
          disabled={isVerified}
          className={`inline-flex items-center gap-2 px-4 py-1 rounded-2xl disabled:cursor-not-allowed font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
            !isVerified
              ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus:ring-yellow-300"
              : "bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-300"
          }`}
        >
          {!isVerified ? (
            <>
              <Clock className="w-4 h-4" />
              <span>Pending</span>
            </>
          ) : (
            <>
              <BsFillStopCircleFill className="w-4 h-4" />
              <span>Verified</span>
            </>
          )}
        </button>

        <Modal
          title={`Are you sure, you want to approve?`}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          maskClosable={false}
          footer={false}
          closable={false}
        >
          <div className="flex justify-end px-4 gap-x-3">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
            >
              No
            </button>
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="px-4 cursor-pointer py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <CgSpinnerTwo className="animate-spin" fontSize={16} />
                </>
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ChangeStatusModal;
