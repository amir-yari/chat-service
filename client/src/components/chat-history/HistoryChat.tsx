import HistoryHeader from "./HistoryHeader";
import HistoryList from "./HistoryList";
export type isMobileType = {
  isMobile: boolean;
};
const HistoryChat = () => {
  return (
    <div className="flex flex-col flex-grow overflow-hidden bg-white ">
      <HistoryHeader />
      <HistoryList />
    </div>
  );
};

export default HistoryChat;
