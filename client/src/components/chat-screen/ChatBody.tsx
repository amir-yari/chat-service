import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

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

interface ChatBodyProps {
  messages: string[];
}

const ChatBody = ({ messages }: ChatBodyProps) => {
  return (
    <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-auto  gap-1">
      {/* Chat Type from sender  */}
      <div
        className="flex flex-row gap-2 max-w-[800px] max-w- w-full mx-auto "
        dir="ltr"
      >
        <div className="flex flex-col max-w-[90%] w-fit h-fit p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-800 m-[3px]">
          <p
            className="break-words text-sm font-normal  text-gray-900 dark:text-white "
            dir="ltr"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            aliquid facere amet facilis, nobis, rem illo molestias temporibus
            enim velit, ut iusto. Delectus ad eveniet, odio inventore dolore
            tempore culpa.
          </p>

          <span
            className="text-xs font-normal text-gray-200 dark:text-gray-400"
            dir="rtl"
          >
            11:46
          </span>
        </div>
        <Dropdown menu={{ items }} className="mt-10">
          <a onClick={(e) => e.preventDefault()}>
            <MoreOutlined />
          </a>
        </Dropdown>
      </div>
      {/* Chat Type from reciever */}
      <div className=" gap-2 max-w-[800px] w-full mx-auto  " dir="rtl">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex flex-col max-w-[90%] w-fit h-fit p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 m-[3px]"
          >
            <p
              className="break-words text-sm font-normal  text-gray-900 dark:text-white "
              dir="ltr"
            >
              {msg}
            </p>

            <span className="text-xs font-normal text-gray-200 dark:text-gray-400">
              <CheckOutlined /> 11:46
            </span>
          </div>
        ))}
      </div>
    </div>

    // <div className="flex flex-col flex-grow  max-w-[800px] w-full mx-auto  ">
    //   <div className="flex-grow overflow-auto p-4">
    //     {/* Chat messages would go here */}

    //     <div
    //       id="messages"
    //       className="flex-grow text-black  overflow-hidden relative w-full"
    //       dir="rtl"
    //     >
    //       <div id="messages-content" className="left-0 h-[101%] w-full mr-4">
    //         {messages.map((msg, index) => (
    //           <div className="flex items-start gap-2.5 mt-2" key={index}>
    //             <img
    //               className="w-8 h-8 rounded-full hover:scale-110"
    //               src={picPic}
    //               alt="Jese image"
    //             />
    //             <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
    //               <div className="flex items-center space-x-2 rtl:space-x-reverse">
    //                 <span className="text-sm font-semibold text-gray-900 dark:text-white">
    //                   Pouya J
    //                 </span>
    //                 {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
    //                   11:46
    //                 </span> */}
    //               </div>
    //               <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
    //                 {msg}
    //               </p>
    //               <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
    //                 Delivered - 11:46
    //               </span>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export default ChatBody;
