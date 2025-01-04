import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  useSessionDispatch,
  useSessionSelector,
  useUserSelector,
} from "../../store/hooks";
import { useParams } from "react-router-dom";
import { Message } from "../../types/Message";
import { sessionActions } from "../../store/session-slice";
import { useEffect, useMemo, useRef } from "react";

const items: MenuProps["items"] = [
  {
    label: "Reply",
    key: "1",
  },
  {
    label: "Forward",
    key: "2",
  },
  {
    label: "More",
    key: "3",
  },
];

const ChatBody = () => {
  const user = useUserSelector((state) => state.user.currentUser);
  const session = useSessionSelector((state) => state.session.items);
  const sessionDispatch = useSessionDispatch();

  const { sessionId } = useParams();

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId) {
      sessionDispatch(sessionActions.setSelectedSession(sessionId));
    }
  }, [sessionId, sessionDispatch]);

  const allMessages: Message[] = useMemo(() => {
    if (!sessionId) return [];
    const currentSession = session.find((session) => session.id === sessionId);
    return currentSession?.messages || [];
  }, [session, sessionId]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [allMessages]);

  return (
    <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto gap-1">
      {allMessages.map((msg, index) => (
        <div
          key={index}
          className={`flex gap-2 max-w-[800px] w-full mx-auto ${
            msg.senderId === user._id ? "justify-end" : "justify-start"
          }`}
          dir="ltr"
        >
          <div
            className={`flex flex-col max-w-[90%] w-fit h-fit p-2 border-gray-200 ${
              msg.senderId === user._id
                ? "bg-blue-100 dark:bg-blue-800 rounded-e-xl rounded-es-xl"
                : "bg-gray-100 dark:bg-gray-700 rounded-s-xl rounded-se-xl"
            } m-[3px]`}
          >
            <p
              className="break-words text-sm font-normal text-gray-900 dark:text-white"
              dir="ltr"
            >
              {msg.text}
            </p>
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {msg.senderId === user._id ? (
                <span>
                  {/* Check for sent status (just a single gray checkmark) */}
                  {msg.status === "sent" && (
                    <CheckOutlined style={{ color: "gray" }} />
                  )}
                  {/* Check for delivered status (gray checkmark) */}
                  {msg.status === "delivered" && (
                    <>
                      <CheckOutlined style={{ color: "grey" }} />
                      <CheckOutlined style={{ color: "grey" }} />
                    </>
                  )}
                  {/* Check for read status (blue checkmark) */}
                  {msg.status === "read" && (
                    <>
                      <CheckOutlined style={{ color: "blue" }} />
                      <CheckOutlined style={{ color: "blue" }} />
                    </>
                  )}
                </span>
              ) : (
                <></>
              )}

              {"  "}
              {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          {msg.senderId === user._id && (
            <Dropdown menu={{ items }} className="mt-10">
              <a onClick={(e) => e.preventDefault()}>
                <MoreOutlined />
              </a>
            </Dropdown>
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBody;
