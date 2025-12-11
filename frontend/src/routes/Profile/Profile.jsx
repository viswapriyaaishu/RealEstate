import { Card } from '../../components/Card/Card';
import './Profile.scss'
import { Suspense, useContext, useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Apirequest } from '../../lib/ApiReq';
import { Authcontext } from '../../context/Authcontext';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Await } from 'react-router-dom';
import {format} from "timeago.js"
import { SocketContext } from '../../context/Socketcontext';
import { useRef } from 'react';
import { notificationStore } from '../../context/notificationStore';
export const Profile = () => {
    let { user } = useContext(Authcontext)
    let {socket}=useContext(SocketContext)
    const profiledata = useLoaderData()
    if (user != null) {
        user = user.data.user
    }
    const { updateuser } = useContext(Authcontext)
    const [chatopen, setChatopen] = useState(null)
   
    const [chat,setChat]=useState(null)

    const chatref=useRef()

    useEffect(()=>{
        chatref?.current?.scrollIntoView({behavior:"smooth"})
    },[chat])
    const navigate=useNavigate()

    useEffect(() => {
    if (!user) {
        navigate("/login");
    }
}, [user]);

const decreasenotification=notificationStore(state=>state.decreasenotification)
    const openchat=async(msg)=>{
        setChatopen(msg);
        const indchat=await Apirequest.get("/chats/"+msg.id);
         console.log("1 chat item")
         console.log(indchat.data.messages)
        setChat(indchat.data.messages)

        if(!chatopen?.seenby.includes(user?.id)){decreasenotification()}
        console.log("messages chat")
        console.log(chat)
   }

   const submitform=async(e)=>{
    e.preventDefault()

    const formData=new FormData(e.target)
    const content=formData.get("content")
    if(!content){return ;}
    try{
        const res=await Apirequest.post("/messages/"+chatopen?.id,{content:content})
        setChat(prev=>[...prev,res.data])
        if(socket){
            socket.emit("sendmsg",{data:res.data,receiver:chatopen?.receiver?.id})
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        e.target.reset()
    }

   }

   useEffect(()=>{
    
        socket.on("receivemsg",async(res)=>{
           if(chatopen.id==res.chatid ) {setChat(prev=>([...prev,res]))}
           await Apirequest.get("/chats/"+chatopen.id)
        })

        return ()=>{socket.off("receivemsg")}
    
   },[socket,chatopen])
    return (
        <div className="profile">

            <div className="profilelcon">
                <div className="profilelwrap">
                    <div className="ptopcon">
                        <div>User Information</div>
                        <div><Link to="/profile/update" className="updpro">Update Profile</Link></div>
                    </div>

                    {


                        <div className="pmidcon">
                            <div><span>Avatar:</span>
                                <img src={user?.photoimg || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZF9csEvwx9SzpwjfwqhePzROYU9Qlfzd64A&s"}></img></div>

                            <div>
                                <div>Username:</div>
                                <div>{user?.name}</div>
                            </div>

                            <div>
                                <div>Email:</div>
                                <div>{user?.email}</div>
                            </div>
                            <div className="logout" onClick={async () => {
                                await Apirequest.post("/auth/logout",
                                    updateuser(null)
                                )
                            }}>Logout</div>
                        </div>


                    }



                    <div className="probottomcon">
                        <div className="mylist"><div className="listhead">
                            <div>My List</div>
                            <Link to="/addpost"><div className="createbtn">Create New Post</div></Link>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Await resolve={profiledata.response} errorElement={<div>Error</div>}>
                                {
                                    (response) => {
                                        
                                        return (
                                            <div className="mycards">
                                                {response.data.myposts.map((item) => (
                                                    <Card key={item.id} item={item} className="profilelistcard" ></Card>
                                                ))}
                                            </div>
                                        )
                                    }
                                }
                            </Await>
                        </Suspense></div>

                        <div className="savedlist">
                            <div>Saved List</div>
                            <Suspense fallback={<div>Loading...</div>}>
                            <Await resolve={profiledata.response} errorElement={<div>Error</div>}>
                                {
                                    (response) => {
                                        // console.log(response.data.savedposts)
                                        return (
                                            <div className="mycards">
                                                {response.data.savedposts.map((item) => (
                                                    <Card key={item.id} item={item.post} className="profilelistcard" ></Card>
                                                ))}
                                            </div>
                                        )
                                    }
                                }
                            </Await>
                        </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profilercon">
                <div className="profilerwrap">
                    <Suspense fallback={<div>Loading ...</div>}>
                    <Await resolve={profiledata.chatres} errorElement={<div>Error occured</div>}>
                    {(chatres)=>{
                        console.log(`abhi aaya\n`)
                        console.log(chatres.data)
                        return(
                            <>
                             <div className="msgscon">
                        <div>Messages</div>
                        <div className="msglist">{chatres.data.map((msg) => (
                            <div className={`msgit ${(msg.seenby.includes(user?.id) ||chatopen?.id==msg?.id? "nactive":"active")}`} onClick={()=>{openchat(msg)}}>
                                <img src={msg.receiver.photoimg ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKHOn2k1T2tfb7tyjZhHlV0fsXD19G9lY-A&s" }></img>
                                <div>{msg.receiver.name}</div>
                                <div>{msg.lastmsg} </div>
                            </div>
                        ))}</div>
                    </div>
                    <div className="chatcon">
                        {chatopen && <> <div className='chatprofilepar'>
                            <div className="chatprofile">
                                <img src={chatopen?.receiver.photoimg}></img>
                                <div>{chatopen?.receiver.name}</div>
                            </div>
                            <div onClick={() => { setChatopen(false) }}><CloseIcon></CloseIcon></div>
                        </div>


                            <div className="chatcon">{chat &&
                                chat.map((chatitem) => (
                                    <div className={`${chatitem.userid ==user?.id ? "own" : "other"}`}>
                                        <div>{chatitem.content}</div>
                                        <div className='chatdate'>{format(chatitem.createdAt)}</div>
                                    </div>
                                ))
                            }
                            <div ref={chatref}></div>
                            </div>

                            <form onSubmit={submitform}>
                                <textarea name="content"></textarea>
                                <button type='submit'>Send</button>
                            </form>
                        </>}
                    </div>
                            </>
                        )
                    }}
                    </Await>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}