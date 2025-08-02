import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:3000":"/";
export const useAuthStore=create((set,get)=>({
    authUser:null,
isSigningUp:false,
isLoggingIn:false,
isUpdatingProfile:false,
socket:null,
    isCheckingAuth:true,
    onlineUser:[],

    checkAuth:async ()=>{

        try {
            const res=await axiosInstance.get("/auth/check");
set({authUser: res.data})
            get().connectSocket();
        } catch (error) {
            console.log("Error in checking",error)
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try {
             const res = await axiosInstance.post("/auth/signup",data);
             set({authUser:res.data});
             toast.success("Account created successfully");
             get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },


        login:async(data)=>{
            set({isLoggingIn:true})
            try {
                const res=await axiosInstance.post("/auth/login",data);
                set({authUser:res.data});
                toast.success("User successfully logged in")
                get().connectSocket();
            } catch (error) {
                toast.error(error.response.data.message) 
            }
            finally{
                set({isLoggingIn:false});
            }
        },


     logout:async ()=>{
            try {
                const res=await axiosInstance.post("/auth/logout");
                set({authUser:null});
                get().disconnectSocket();
                toast.success("User successfully logedout");
            } catch (error) {
                toast.error(error.response.data.message);
            }
    },

    UpdatingProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

  
    connectSocket:()=>{
       
        const { authUser, socket: existingSocket } = get();

if (!authUser || existingSocket?.connected) {
    return;
}

const socket = io(BASE_URL, {
    query: { userId: authUser._id },
});

        console.log("connected");

        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUser",(userIds)=>{
            set({onlineUser:userIds})
        })

    },

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}))
