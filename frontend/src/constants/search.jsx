import React, { useState } from 'react'
import { User } from 'lucide-react'

function  Search() {
    const [email,setEmail]=useState("")

  const Checkuser=(e)=>{
        e.preventDefault();
        
  }

  return (
    <div>
        <form onSubmit={Checkuser} className='flex text-center'> 
        <input type="text" placeholder="Search User..." 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="input" />
       <button className="btn btn-ghost">Search</button>
        </form>
    </div>
  )
}

export default Search