import Sidebar from "../component/Sidebar";

import Nochatui from "../component/Nochatui";
import { useChatStore } from "../store/useChatStore";
import { ChatContainer } from "../component/chatontainer";



const HomePage = () => {
                const {users,selectedUser}=useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>

            {!selectedUser ? <Nochatui/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;