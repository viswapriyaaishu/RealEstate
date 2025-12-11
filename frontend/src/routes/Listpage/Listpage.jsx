import { useLoaderData, useSearchParams,Link } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { Map } from '../../components/Map/Map';
import './Listpage.scss'
import { Suspense, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Await } from 'react-router-dom';
import { Apirequest } from '../../lib/ApiReq';
export const Listpage=()=>{

 
  const posts=useLoaderData()
 

const [searchParams,setSearchParams]=useSearchParams()

const [query,setquery]=useState({
    city:searchParams.get("city")||"",
    type:searchParams.get("type")||"",
    property:searchParams.get("property")||"",
    minprice:searchParams.get("minprice")||0,
    maxprice:searchParams.get("maxprice")||999999999999,
    bedroom:searchParams.get("bedroom")||1
})
const searchform1=(e)=>{
    e.preventDefault()
    setSearchParams(query)

}
const handlechange=(e)=>{
setquery(prev=>({...prev,[e.target.name]:e.target.value}))
}
    return(
        <div className="listcon">
            <div className="listleftcon">
                <div className="leftconwrap">
                <form className="searchparams" onSubmit={()=>{searchform1()}}>
                    <div className="searchheading">Search results for {searchParams.get("city")}</div>
                <div className="loc">
                    <label htmlFor=""></label>
                <input type='text' id='city' name='city' placeholder='City Location' defaultValue={query.city} onChange={handlechange}></input>
                </div>
                <div className="searchfields" >
                 <div className="type">
                    <label htmlFor="">Type</label>
                <select id='type' name='type' placeholder='Type' defaultValue={query.type} onChange={handlechange}>
                    <option value=''>any</option>
                    <option value='buy'>Buy</option>
                    <option value='rent'>Rent</option>
                </select>
                </div>
                 <div className="property">
                    <label htmlFor="">Property</label>
                <select id='property' name='property' placeholder='Property' defaultValue={query.property} onChange={handlechange}>
                    <option value=''>any</option>
                    <option value='apartment'>Apartment</option>
                    <option value='house'>House</option>
                    <option value='condo'>Condo</option>
                    <option value='land'>Land</option>
                </select>
                </div>
                 <div className="minprice">
                    <label htmlFor="">Min Price</label>
                <input type='number' id='minprice' name='minprice' placeholder='Minprice' defaultValue={query.minprice} onChange={handlechange}></input>
                </div>
                 <div className="maxprice">
                    <label htmlFor="">Max Price</label>
                <input type='number' id='maxprice' name='maxprice' placeholder='Maxprice' defaultValue={query.maxprice} onChange={handlechange}></input>
                </div>
                 <div className="bedroom">
                    <label htmlFor="">Bedroom</label>
                <input type='text' id='bedroom' name='bedroom' placeholder='Bedroom' min={1} defaultValue={query.bedroom} onChange={handlechange}></input>
                </div>
                <button type="submit"><SearchIcon></SearchIcon></button>
                </div>

                <div className="listits">
                <Suspense fallback={<div>Loading ....</div>}>
                <Await resolve={posts.response} errorElement={<div>Error loading posts</div>}>
                
                {(response)=>{
                    console.log("response from back","\n",response.data)
                    return(
                        response.data.map((item)=>(
                    <Card key={item.id} item={item}></Card>)
                )
                    )
                }
                }
                </Await>
                
                </Suspense>
                </div>
                </form>
                </div>
            </div>
            <div className="listrightcon">
              <Suspense fallback={<div>Loading ...</div>}>
              <Await resolve={posts.response} errorElement={<div>Error loading map</div>}>
              {(response)=><Map posts={response.data}></Map>}
              </Await>
              </Suspense>
            </div>
        </div>
    )
}