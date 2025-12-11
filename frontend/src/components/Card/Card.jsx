import { Link } from 'react-router-dom';
import './Card.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
export const Card=({item,className})=>{
    
    return(
        <div className={`cardcon ${className ?'profilelistcard':''}`}>
            <div className="cardimg">
               <Link to={`/list/${item.id}`}> <img src={item.images.length>=1 ? item.images[0]:""}></img> </Link>
            </div>

            <div className="carddesc">
               <div className="carddescwrap">
                 <div className="cardtitle">{item.title}</div>
                <div className='cardloc'>
                    <div><LocationOnIcon></LocationOnIcon></div>
                    <div>{item.address}</div></div>

                <div>${item.price}</div>

                <div className="cardsubs">
                    <div>
                        <div>
                            <BedroomChildOutlinedIcon></BedroomChildOutlinedIcon>
                        {item.bedroom} bedroom
                    </div>
                    <div>
                        <BathtubOutlinedIcon></BathtubOutlinedIcon>
                        {item.bathroom} bathroom
                    </div>
                    </div>
                    <div>
                        <div className="chaticons"><BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon></div>
                    <div className="chaticons"><ChatOutlinedIcon></ChatOutlinedIcon></div>
                    </div>
                </div>
               </div>
            </div>
        </div>
    )
}