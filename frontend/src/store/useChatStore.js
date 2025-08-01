import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore";
export const useChatStore=create((set,get)=>({
messages:[],
users:[],
selectedUser:null,
isLoadingUser:false,
isMessagesLoading:false,

getUsers:async()=>{
    
set({isLoadingUser:false});
    try {
        const res=await axiosInstance.get("/message/user");
        set({users:res.data});
       
        toast.success("All users Fetched...");
       
    } catch (error) {
        toast.error(" Users not Fetched...");
    }
    finally{
        set({isLoadingUser:false});
    }
},

    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/message/user/${userId}`)
          
            set({messages:res.data})
             
            toast.success("All messages Fectched");

        } catch (error) {
            toast.error("messages not Fectched");
            console.log(error.response.data.message)
        }
        finally{
            set({isMessagesLoading:false});
        }
        
    },

    sendMessage:async(messageData)=>{
            const {selectedUser,messages}=get();

            try {
                
                const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
                   
                 set({ messages: [...messages, res.data]}); 
            } catch (error) {
                toast.error(error.response.data.message);
                toast.error("error in send message")
            }
    }
    ,
subscribeToMsg:()=>{
    const {selectedUser}=get();
        if(!selectedUser)return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id)return;
            set({
                messages:[...get().messages,newMessage]
            })
        })
},

unSubscribeMsg:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
}
    ,
    setselectedUser:(selectedUser)=>set({selectedUser}),

}))