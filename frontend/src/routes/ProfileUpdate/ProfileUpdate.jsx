import "./ProfileUpdate.scss"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Apirequest } from "../../lib/ApiReq"
import { useContext } from "react"
import { Authcontext } from "../../context/Authcontext"
import UploadWidget from "../../components/Widget/Widget"

export const ProfileUpdate=()=>{
    const [err,seterror]=useState("")
    let {user,updateuser}=useContext(Authcontext)
    
    if(user!==null){
        user=user.data.user
    }
    
    const [avatar,setavatar]=useState([])
    const navigate=useNavigate()
    const profileupsubmithandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData(e.target)
        const {username,email,password}=Object.fromEntries(formdata)
        
        try{
            let res1=null
        if(user!=null)
        {res1= await Apirequest.put(`/user/${user.id}`,{name:username,email,password,photoimg:avatar[0]})}
            if(res1!=null){
                console.log("updation side res")
                const response={data:{user:res1.data}}
                updateuser(response)
               
                navigate("/profile")
            }

            }
        catch(err){
            
            seterror(err?.response?.data?.message)
            console.log(err?.response?.data?.message)
        }
    }
    return (
        <>
       
        <form className="profileup" onSubmit={profileupsubmithandler}>
           <div className="signlcon1" >
             <div className="signup1heading">Update User</div>
        <div>
            <div><div>Username</div>
            <input type="username" placeholder="Username" name="username" defaultValue={user.name}></input></div>
            <div><div>Email</div>
            <input type="email" placeholder="Email" name="email" defaultValue={user.email}></input></div>
            <div><div>Password</div>
            <input type="password" placeholder="Password" name="password"></input></div>
        </div>
        <button type='submit'>Update</button>
        
        <div>{err}</div>
           </div>
           <div className="signrcon1">
            <img src={`${avatar.length==1}?${avatar[0]}|| ${user?.photoimg}||"https://www.snia.org/sites/default/files/2025-09/random-user2.jpg"`} name="avatar"></img>
            <div>
                <UploadWidget uwConfig={{
                cloudName:"dlcimnrkc",
                uploadPreset:"realestate",
                folder:"avatars",
                multiple:false,
                maxImageFileSize:2000000
            }} setavatar={setavatar}></UploadWidget>
            </div>
           </div>
        </form>
        </>
    )
}