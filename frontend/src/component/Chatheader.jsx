import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const Chatheader = () => {
  const { selectedUser, setselectedUser } = useChatStore();

  return (
    <div className="p-2.5 border-b border-base-300 w-full">
      <div className="flex items-center w-full justify-between">
        
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {false ? "Online" : "Offline"}
            </p>
          </div>
        </div>

       
        <button onClick={() => setselectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default Chatheader;
