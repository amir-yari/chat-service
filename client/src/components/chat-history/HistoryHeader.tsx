import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Input, Dropdown, MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const HistoryHeader = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `Hi,`,
    },

    // {
    //   key: "2",
    //   label: <NavLink to={"/account"}>Account</NavLink>,
    // },
    // {
    //   key: "3",
    //   label: <NavLink to={"/trips"}>Trips</NavLink>,
    // },
    // {
    //   key: "4",
    //   label: (
    //     <Button type="text" onClick={handleLogout}>
    //       Logout
    //     </Button>
    //   ),
    // },
  ];

  return (
    <>
      <div className="bg-white">
        <Row className="w-full  justify-center pt-2 pb-2">
          <Col className="mt-2" span={3}>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button
                icon={<MenuOutlined />}
                className="mb-2  ml-2"
                type="text"
              />
            </Dropdown>
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
