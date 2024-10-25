import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Layout className="min-h-screen bg-green-200 ">
      <Outlet />
    </Layout>
  );
};

export default Root;
