import { Form, Input, message, Modal, Select } from "antd";
import { useAddSubscriptionMutation } from "../../page/redux/api/manageApi";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

export const AddSubscriptionModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addSubscription, { isLoading }] = useAddSubscriptionMutation();

  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setModalOpen(false);
  };

  const handleSubmit = async (values) => {
    const data = {
      duration: values?.duration,
      price: Number(values?.price),
      description: values?.description,
      title: values?.title,
    };
    try {
      const response = await addSubscription(data).unwrap();

      message.success(response?.message);
      setModalOpen(false);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  return (
    <>

      <button
        className="bg-[#D17C51] w-60 py-2 px-5 text-white rounded mb-4 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        + Add Subscription
      </button>

      <Modal
        centered
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <div className="mb-6 mt-4">
          <h2 className="text-center font-bold text-lg mb-11">Add</h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* Package Name */}
            <Form.Item
              label="Subscription Plan Name"
              name="title"
              rules={[
                { required: true, message: "Please enter the package name" },
              ]}
            >
              <Input className="py-2" placeholder="Enter package name" />
            </Form.Item>

            {/* Price */}
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <Input className="py-2" type="number" placeholder="Enter price" />
            </Form.Item>

            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Duration"
                optionFilterProp="label"
                options={[
                  { value: "WEEKLY", label: "Weekly" },
                  { value: "MONTHLY", label: "Monthly" },
                  { value: "YEARLY", label: "Yearly" },
                  { value: "LIFETIME", label: "Life Time" },
                ]}
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                className="px-4 py-3 w-full bg-[#D9000A] text-white rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 w-full bg-[#D17C51] text-white rounded-md flex items-center justify-center gap-x-2"
              >
                {isLoading ? (
                  <>
                    <CgSpinner size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
