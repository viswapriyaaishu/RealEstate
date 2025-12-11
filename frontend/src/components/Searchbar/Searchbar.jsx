import { useState } from 'react';
import './Searchbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
export const Searchbar=()=>{

    
    const btntypes=["buy","rent"]
    const [query,setquery]=useState({
        type:"buy",
        location:"",
        minprice:0,
        maxprice:999999999999
    })

    const switchfunc=(type)=>{
        setquery((prev)=>({...prev,type:type}))
    }

    const submithandler=(e)=>{
        e.preventDefault()
        setquery(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    return(
        <div className="searchcomp">
            <div className="btns">
                   {btntypes.map((type)=>(
                    <button onClick={()=>{switchfunc(type)}} className={`${query.type==type?"activeb":""}`} name="type" onChange={submithandler}>{type}</button>
               
                   ))}
                </div>
            <form className="searchip">
                <input type="text" name="city" onChange={submithandler} placeholder="city"></input>
                <input type="number" min={0} max={999999999999} name="minprice" onChange={submithandler} placeholder="minprice"></input>
                <input type="number"  min={0} max={999999999999} name="maxprice" onChange={submithandler} placeholder="maxprice"></input>
                <Link to={`/list?city=${query.location}&type=${query.type}&minprice=${query.minprice}&maxprice=${query.maxprice}`}><button><SearchIcon></SearchIcon></button></Link>
            </form>
            <div className="searchtext">
                
                <div className="yrs">
                    <div>16+</div>
                    <div>Years of Experience</div>
                </div>

                <div className="awards">
                    <div>200</div>

                    <div>Awards Gained</div>

                    </div>
                    <div className="property">
                        <div>2000+</div>
                        <div>Property Ready</div>
                    </div>
            </div>
        </div>
    )
}