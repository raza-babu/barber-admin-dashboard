import { Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useGetSingleReplyQuery,
  useReplyUserMutation,
} from "../../page/redux/api/manageApi";

const ReplyUserModal = ({ record }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const id = record?.key;
  const [form] = Form.useForm();
  const { data: singleReply } = useGetSingleReplyQuery({ id });
  const [replyUser] = useReplyUserMutation();

  const handleCancel = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (singleReply?.data) {
      form.setFieldsValue({
        message: singleReply?.data?.message,
      });
    }
  }, [singleReply, form]);

  const handleSubmit = async (values) => {
    const id = record?.key;
    const data = {
      userId: record?.id,
      message: values?.message,
    };

    try {
      const response = await replyUser({ data, id }).unwrap();

      message.success(response?.message);
      setModalOpen(false);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-500 border px-4 py-1 rounded text-white"
      >
        Reply
      </button>
      <Modal
        centered
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div className="mb-6 mt-4">
          <h2 className="text-center font-bold text-lg mb-4">Reply</h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* Description */}
            <Form.Item
              label="Answer"
              name="message"
              rules={[{ required: true, message: "Please enter the reply" }]}
            >
              <Input.TextArea placeholder="Enter Reply" rows={4} />
            </Form.Item>
            <div className="flex gap-3 mt-3">
              <button
                type="submit"
                disabled={!!singleReply?.data?.message}
                className={`px-4 py-3 w-full rounded-md text-white 
                ${
                  singleReply?.data?.message
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#D17C51]"
                }`}
              >
                Reply
              </button>

              <button
                type="button"
                className="px-4 py-3 w-full bg-[#D9000A] text-white rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ReplyUserModal;
