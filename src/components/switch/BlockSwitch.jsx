import { message, Switch } from "antd";
import { useBlockCustomerMutation } from "../../page/redux/api/manageApi";

const BlockSwitch = ({ record }) => {
  const [blockCustomer, { isLoading: blockLoading }] =
    useBlockCustomerMutation();


  const handleBlockToggle = async (record) => {
    try {
      const payload = {
        status: record.status === "BLOCKED" ? false : true,
      };

      const res = await blockCustomer({
        id: record.key,
        data: payload,
      }).unwrap();

      //message.success(res?.message || "Status updated ✅");
    } catch {
      message.error("Failed to update status ❌");
    }
  };


  return (
    <>
      <Switch
        checked={record.status === "ACTIVE"} // ACTIVE হলে ON
        onChange={(checked) => handleBlockToggle(record, checked)}
        loading={blockLoading}
        disabled={record.status === "PENDING"}
      />
    </>
  );
};

export default BlockSwitch;
