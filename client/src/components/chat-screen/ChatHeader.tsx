import { Avatar, Badge, Button, Col, Row } from "antd";
import {
  ArrowLeftOutlined,
  MoreOutlined,
  PhoneOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSessionSelector } from "../../store/hooks";

type HeaderProps = {
  isMobile: boolean;
  toggleChatScreen: () => void;
};

const ChatHeader = ({ isMobile, toggleChatScreen }: HeaderProps) => {
  const selectedSession = useSessionSelector(
    (state) => state.session.selectedSession
  );
  return (
    <>
      <div className="bg-white">
        <Row className="w-full justify-center pt-2 pb-2">
          {isMobile && (
            <Col className="mt-2" span={3}>
              <Badge count={5} size="small" offset={[0, 4]} color="blue">
                <Button
                  style={{ transform: "scale(1.5)" }}
                  icon={<ArrowLeftOutlined />}
                  className="mb-2"
                  type="text"
                  onClick={toggleChatScreen}
                />
              </Badge>
            </Col>
          )}
          <Col
            span={isMobile ? 19 : 20}
            className="flex flex-row flex-grow"
            push={isMobile ? undefined : 1}
          >
            <Avatar
              // src={}
              size="large"
              style={{ transform: "scale(1.2)" }}
            />
            <div className="flex flex-col ml-2">
              <h3 className="font-bold">{selectedSession?.id}</h3>
              <p className="opacity-50">last seen recently</p>
            </div>
          </Col>
          <Col span={isMobile ? 2 : 4}>
            {isMobile && (
              <Button
                style={{ transform: "scale(1.5)" }}
                icon={<MoreOutlined />}
                type="text"
                className="mt-2"
              />
            )}
            {!isMobile && (
              <>
                <Button
                  style={{ transform: "scale(1.5)" }}
                  icon={<SearchOutlined />}
                  type="text"
                  className="mt-2"
                />
                <Button
                  style={{ transform: "scale(1.5)" }}
                  icon={
                    <PhoneOutlined style={{ transform: "rotate(90deg)" }} />
                  }
                  type="text"
                  className="mt-2"
                />
                <Button
                  style={{ transform: "scale(1.5)" }}
                  icon={<MoreOutlined />}
                  type="text"
                  className="mt-2"
                />
              </>
            )}
          </Col>
        </Row>
      </div>
      <div className="border-t border-gray-300" />
    </>
  );
};

export default ChatHeader;
