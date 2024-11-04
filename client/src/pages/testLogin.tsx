import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { messageActions } from "../store/message-slice";
import { sessionActions } from "../store/session-slice";
import { useNavigate } from "react-router-dom";

interface FormValues {
  userID: string;
  receiverID: string;
}

const ChatConnectionForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: FormValues) => {
    const { userID, receiverID } = values;

    dispatch(userActions.setUser({ id: userID, isLoggedin: true }));
    dispatch(
      messageActions.saveMessage({
        text: "Session started",
        senderId: userID,
        recieverId: receiverID,
        sessionId: `${userID}-${receiverID}`,
      })
    );

    dispatch(
      sessionActions.addParticipant({
        id: userID,
        isLoggedin: true,
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        profileImage: "",
      })
    );
    dispatch(
      sessionActions.addParticipant({
        id: receiverID,
        isLoggedin: false,
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        profileImage: "",
      })
    );

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
            className="h-10 px-3 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-white">Receiver ID</span>}
          name="receiverID"
          rules={[{ required: true, message: "Please enter the Receiver ID!" }]}
        >
          <Input
            placeholder="Enter the Receiver ID"
            className="h-10 px-3 rounded-md bg-gray-700 text-white placeholder-gray-400"
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
