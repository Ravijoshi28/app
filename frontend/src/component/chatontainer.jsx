import { useChatStore } from "../store/useChatStore";
import { useEffect,useRef } from "react";
import Chatheader from "./ChatHeader";
import MessageSkeleton from "./skeleton/msgSkeleton";
import Messageinput from "./Messageinput";
import  { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/util";

export function ChatContainer(){
  const messageEndRef = useRef(null);
  const {selectedUser,messages,isMessagesLoading, getMessages,subscribeToMsg,unSubscribeMsg}=useChatStore();
  const {authUser}=useAuthStore();
  useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToMsg();
        return ()=>unSubscribeMsg()
  },[selectedUser._id,getMessages]);

useEffect(() => {
  if(messageEndRef.current && messages){
    messageEndRef.current.scrollIntoView({behavior:"smooth"});
  }
}, [messages])


  if(isMessagesLoading) return(
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader></Chatheader>
      <MessageSkeleton></MessageSkeleton>

      </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
<Chatheader></Chatheader>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message)=>(
            <div key={message._id} className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`}
            ref={messageEndRef}
            >
                  <div className="chat-image avatar">
                        <div className="size-10 rounded-full border">

                            <img src={message.senderId===authUser._id?authUser.profilePic || "./avatar.png":selectedUser.profilePic ||
                               "./avatar.png"}></img>

                          </div>
                    </div>
                <div className="chat-header">
<time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
           </div>
                    <div className="chat-bubble flex flex-col">
                      {message.image && 
                           <img src={message.image} className="sm:max-w-[200px] rounded-md mb-2"
                             alt="attachment">
                          </img>}
                      {message.text && <p>{message.text}</p>}
                      </div>          
                  
              </div>
          ))}
          
      </div>
          
              <Messageinput></Messageinput>
           
      
    </div>
  )
}