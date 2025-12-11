import {MapContainer,TileLayer,Marker,Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import './Map.scss'
import { Link } from "react-router-dom"
export const Map=({posts})=>{
  console.log(posts)
    return(
        <MapContainer center={posts.length==1?[posts[0].latitude,posts[0].longitude]:[51.505, -0.09]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {posts.map((item)=>(
        <Marker position={[item.latitude,item.longitude]}>
      <Popup>
        <div className="mapcontainer">
            <div className="mlcon"><img src={item.images[0]}></img></div>
            <div className="mrcon">
                <div className="mrwrap">
                    <div><Link to={`${item.id}`}>{item.title}</Link></div>
                    <div>{item.bedRooms}<span className='bedrooms'> bedrooms</span> </div>
                    <div>${item.price}</div>
                </div>
            </div>
        </div>
      </Popup>
    </Marker>
    ))}
  </MapContainer>
    )
}