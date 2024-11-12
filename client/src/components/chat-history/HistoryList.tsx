import { List, Avatar, FloatButton } from "antd";
import { CommentOutlined, EditOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import type { isMobileType } from "./HistoryChat";
import { useSessionSelector } from "../../store/hooks";

const HistoryList = () => {
  const sessions = useSessionSelector((state) => state.session.items);

  return (
    <div className="bg-white  flex-grow">
      <List
        className="ml-2"
        itemLayout="horizontal"
        dataSource={sessions}
        renderItem={(session, index) => (
          <NavLink to={`/home/${session.id}`}>
            <List.Item style={{ borderBottom: "none" }}>
              <List.Item.Meta
                className="rounded-md hover:bg-blue-500 "
                //   avatar={
                //     <Avatar
                //       size={60}
                //       src={
                //         item.pic
                //           ? item.pic
                //           : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`
                //       }
                //     />
                //   }
                title={
                  <p className="font-bold text-ellipsis whitespace-nowrap overflow-hidden flex flex-row justify-between">
                    <span className="truncate">{session.id}</span>
                    <span className="text-s font-normal text-gray-200 dark:text-gray-400 mr-2">
                      11:45
                    </span>
                  </p>
                }
                //   description={
                //     <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                //       {item.msg
                //         ? item.msg
                //         : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi a, amet nobis consequatur quia praesentium libero nostrum tempora ipsum eaque, nesciunt, voluptas repellendus corrupti quibusdam impedit repellat? Reprehenderit, atque."}
                //     </p>
                //   }
              />
            </List.Item>
          </NavLink>
        )}
      />
      {/* {!isMobile && (
         <div className="absolute bottom-0 left-[380px]">
          <FloatButton.Group
            className="relative "
            trigger="click"
            type="primary"
            style={{ transform: "scale(1.5)" }}
            icon={<EditOutlined />}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
        </div>
      )}
      {isMobile && (
        <FloatButton.Group
          className="absolute "
          trigger="click"
          type="primary"
          style={{ transform: "scale(1.5)" }}
          icon={<EditOutlined />}
        >
          <FloatButton />
          <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
      )} */}
    </div>
  );
};
export default HistoryList;
