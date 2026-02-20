import { message, Switch } from "antd";
import { useBlockOwnerMutation } from "../../page/redux/api/manageApi";

const OwnerBlockSwitch = ({ record }) => {
  const [blockOwner, { isLoading: blockLoading }] = useBlockOwnerMutation();

  const handleBlockToggle = async (record) => {
    try {
      const payload = {
        status: record.isVerified ? false : true,
      };

      await blockOwner({
        id: record.id,
        data: payload
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
      />
    </>
  );
};

export default OwnerBlockSwitch;
