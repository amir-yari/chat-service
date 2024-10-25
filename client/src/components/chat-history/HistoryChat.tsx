import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
export type isMobileType = {
  isMobile: boolean;
};
const HistoryChat = ({ isMobile }: isMobileType) => {
  return (
    <div className="flex flex-col flex-grow overflow-hidden bg-white ">
      <HistoryHeader />
      <HistoryList isMobile={isMobile} />
    </div>
  );
};

export default HistoryChat;
