import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Input } from "antd";

const HistoryHeader = () => {
  return (
    <>
      <div className="bg-white">
        <Row className="w-full  justify-center pt-2 pb-2">
          <Col className="mt-2" span={3}>
            <Button
              icon={<MenuOutlined />}
              className="mb-2  ml-2"
              type="text"
            />
          </Col>
          <Col span={20} className="flex flex-row flex-grow ">
            <Input
              className="rounded-3xl bg-gray-100 border-white hover:border-blue-600"
              size="large"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={1} />
        </Row>
      </div>
    </>
  );
};

export default HistoryHeader;
