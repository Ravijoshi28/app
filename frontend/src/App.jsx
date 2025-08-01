import {  Navigate, Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login"
import Signup from "./page/Signup"
import Settings from "./page/Settings"
import Profile from "./page/Profile"
import Navbar from "./component/Navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import {Loader }from "lucide-react"
import  { Toaster } from "react-hot-toast"
import { useTheme } from "./store/usetheme"
function App() {
const {theme}=useTheme();
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);



if(isCheckingAuth && !authUser) return (
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
)

          

 return (<>
 <div data-theme={theme} className="min-h-screen bg-base-200">
 <Navbar></Navbar>
 <Routes>
  <Route path="/" element={authUser?<Home></Home>:<Navigate to="/signup"/>}></Route>
  <Route path="/login" element={!authUser?<Login></Login>:<Navigate to="/"/>}></Route>
  <Route path="/signup" element={!authUser?<Signup></Signup>:<Navigate to="/"/>}></Route>
  <Route path="/settings" element={authUser?<Settings></Settings>:<Navigate to="/signup"/>}></Route>
  <Route path="/profile" element={authUser?<Profile></Profile>:<Navigate to="/signup"/>}></Route>
 </Routes>

<Toaster></Toaster>

 </div>
</>)
}

export default App
