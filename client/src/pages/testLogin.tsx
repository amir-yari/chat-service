import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useUserDispatch } from "../store/hooks";
import { userActions } from "../store/user-slice";

interface FormValues {
  userID: string;
  receiverID: string;
}

const ChatConnectionForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const userDispatch = useUserDispatch();

  const onFinish = (values: FormValues) => {
    const { userID } = values;

    userDispatch(userActions.setUser({ id: userID }));

    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        form={form}
        name="chatConnectionForm"
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg"
      >
        <Form.Item
          label={<span className="text-white">User ID</span>}
          name="userID"
          rules={[{ required: true, message: "Please enter your User ID!" }]}
        >
          <Input
            placeholder="Enter your User ID"
            className="h-10 px-3 rounded-md bg-gray-700 placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 mt-2 bg-green-500 hover:bg-green-600 font-semibold rounded-md text-white"
          >
            Connect
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChatConnectionForm;
