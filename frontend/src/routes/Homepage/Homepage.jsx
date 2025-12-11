import { useContext } from 'react'
import { Searchbar } from '../../components/Searchbar/Searchbar'
import { Apirequest } from '../../lib/ApiReq'
import './Homepage.scss'
import { Authcontext } from '../../context/Authcontext'

export const Homepage=()=>{

    let {user}=useContext(Authcontext)
   if(user!=null){
    user=user.data.user
   }
    return (
        <div className="homecon">
           <div className="textcon">
           
            <div className="textwrap">
                <h1>Find Real Estate & Get Your Dream Place</h1>
            <p>Book homes,rent apartments,avail offers</p>
            <Searchbar></Searchbar>
            </div>
           </div>
           <div className="homeimgcon">
            <img src={"https://marketplace.canva.com/EAGTwK0wOTg/2/0/1600w/canva-black-and-white-minimalistic-real-estate-flat-illustrative-logo-afTi-1EmZtc.jpg"}></img>
           </div>

        </div>
    )
}