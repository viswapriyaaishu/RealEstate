import { useContext, useState } from 'react'
import './Addpost.scss'
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import UploadWidget from '../../components/Widget/Widget'
import { Apirequest } from '../../lib/ApiReq'
import { Authcontext } from '../../context/Authcontext'
import { useNavigate } from 'react-router-dom'

export const Addpost=()=>{
    const [desc,setdesc]=useState("")
    const [imgs,setimgs]=useState([])
    let {user}=useContext(Authcontext)
    const navigate=useNavigate()
    if(user!=null){user=user.data.user}
    
    const addposthandler=async(e)=>{
        e.preventDefault()

        const formdata=new FormData(e.target)

        const inputs=Object.fromEntries(formdata)
        
        try{
            const res=await Apirequest.post("/posts",{
                postform:{
                    title:inputs.title,
                    price:parseInt(inputs.price),
                    images:imgs,
                    address:inputs.address,
                    bedroom:parseInt(inputs.bedroom),
                    city:inputs.city,
                    bathroom:parseInt(inputs.bathroom),
                    latitude:inputs.latitude,
                    longitude:inputs.longitude,
                    type:inputs.type,
                    property:inputs.property,
                    userid:user.id
                },
                postdetail:{
                    desc:desc,
                    utility:inputs.utility,
                    petpolicy:inputs.pet,
                    incomepolicy:inputs.income,
                    size:parseInt(inputs.size),
                    schooldist:parseInt(inputs.school),
                    busdist:parseInt(inputs.bus),
                    restaurantdist:parseInt(inputs.restaurant)
                }
            })
            

            navigate("/list"+res.data.id)
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div className="addpostcon">
            <div className="addpostlcon">
                <div className="addpostlconwrap">
        <div className="addposttit">Add New Post</div>
        <form className="addpostfields" onSubmit={addposthandler}>
            <div className="posttit">
            <label for="posttit1">Title</label>
            <input type="text" id="posttit1" name="title"></input>
        </div>
        <div className="postprice">
            <label for="postprice1">Price</label>
            <input type="number" id="postprice1" name="price"></input>
        </div>
        <div className="postaddress">
            <label for="postaddress1">Address</label>
            <input type="text" id="postaddress1" name="address"></input>
        </div>
        <div className="postdesc">
        <div>Description</div>
        <ReactQuill theme="snow" onChange={setdesc} value={desc}></ReactQuill>
        </div>
        <div className="postcity">
            <label for="postcity1">City</label>
            <input type="text" id="postcity1" name="city"></input>
        </div>
        <div className="postbedroomno">
            <label for="postbedroomno1">Bedroom Number</label>
            <input type="number" id="postbedroomno1" name="bedroom" min={1}></input>
        </div>
        <div className="postbathroomno">
            <label for="postbathroomno1">Bathroom Number</label>
            <input type="number" id="postbathroomno1" name="bathroom" min={1}></input>
        </div>
        <div className="postlatitude">
            <label for="postlatitude1">Latitude</label>
            <input type="text" id="postlatitude1" name="latitude"></input>
        </div>
        <div className="postlongitude">
            <label for="postlongitude1">Longitude</label>
            <input type="text" id="postlongitude1" name="longitude"></input>
        </div>

        <div className="posttype">
            <label for="posttype1">Type</label>
           <select name="type">
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
           </select>
        </div>
         <div className="postproperty">
            <label for="postproperty1">Property</label>
           <select name="property">
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
             <option value="condo">Condo</option>
              <option value="land">land</option>
           </select>
        </div>

        <div className="postutilitypolicy">
            <label for="postutilitypolicy1">Utilities Policy</label>
           <select name="utility">
            <option value="Owner is responsible">Owner is responsible</option>
            <option value="Tenant is responsible">Tenant is responsible</option>
             
           </select>
        </div>
        <div className="postpetpolicy">
            <label for="postpetpolicy1">Pet Policy</label>
           <select name="pet">
            <option value="Allowed">Allowed</option>
            <option value="Not Allowed">Not Allowed</option>
             
           </select>
        </div>
        <div className="postincome">
            <label for="postincome1">Income Policy</label>
            <input type="text" id="postincome1" name="income"></input>
        </div>
        <div className="posttotsize">
            <label for="posttotsize1">Total Size (sqft)</label>
            <input type="number" id="posttotsize1" name="size" min={0}></input>
        </div>
        <div className="postschool">
            <label for="postschool1">School</label>
            <input type="number" id="postschool1" name="school" min={0}></input>
        </div>
        <div className="postbus">
            <label for="postbus1">bus</label>
            <input type="number" id="postbus1" name="bus" min={0}></input>
        </div>
        <div className="postrestaurant">
            <label for="postrestaurant1">Restaurant</label>
            <input type="number" id="postrestaurant1" name="restaurant" min={0}></input>
        </div>
        <button className="updatepostbtn" type="submit">Add</button>
        </form>
        </div>
            </div>
        <div className="addpostrcon">
            {imgs?.map((imgurl)=>(<img src={imgurl}></img>))}
            <UploadWidget uwConfig={{cloudName:"dlcimnrkc",
                uploadPreset:"realestate",
                folder:"posts",
                multiple:true,
                maxImageFileSize:2000000}} setavatar={setimgs}></UploadWidget>
        </div>
        </div>
    )
}