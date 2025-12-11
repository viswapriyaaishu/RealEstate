import './Listitem.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Suspense, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Map } from '../../components/Map/Map';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareIcon from '@mui/icons-material/Square';
import MoneyIcon from '@mui/icons-material/Money';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import PetsIcon from '@mui/icons-material/Pets';
import DOMPurify from "dompurify"
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Await } from 'react-router-dom';
import { Apirequest } from '../../lib/ApiReq';
import { useContext } from 'react';
import { Authcontext } from '../../context/Authcontext';
export const Listitem = () => {

    const post = useLoaderData()

    const mapdata = [
        {
            id: 6,
            title: "Spacious 3BR with Garden",
            img: "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg",
            bedRooms: 3,
            bathRooms: 2,
            price: 2000,
            address: "5 Garden Court, London",
            latitude: 51.515,
            longitude: -0.13
        }
    ]
    const singlePostData = {
        id: 1,
        title: "Beautiful Apartment",
        price: 1200,
        images: [
            "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
            "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg",
            "https://images.pexels.com/photos/2064246/pexels-photo-2064246.jpeg",
            "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg"
        ],
        bedRooms: 2,
        bathroom: 1,
        size: 861,
        latitude: 51.5074,
        longitude: -0.1278,
        city: "London",
        address: "1234 Broadway St",
        school: "250m away",
        bus: "100m away",
        restaurant: "50m away",
        description: "An apartment which is amiable ,ecofriendly + greenery supported,gym,swimming pool,park integrated.Also has a mini cafe too,offers a magnificience scenic view of the surroundings."
    };


const {user}=useContext(Authcontext)
    const [slideno, setslideno] = useState(null)

    const setdir = (dir) => {
        if (dir == 'l') {
            if (slideno == 0) {
                setslideno(singlePostData.images.length - 1)
            }
            else {
                setslideno(slideno - 1)
            }
        }
        else if (dir == 'r') {
            if (slideno == singlePostData.images.length - 1) {
                setslideno(0)
            }
            else {
                setslideno(slideno + 1)
            }
        }
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={post.response} errorElement={<p>Error loading post</p>}>
                {(response) => {

                    const mappost = [response.data]
                   
                    const [save, setsave] = useState(mappost[0].postsavestatus)
                    const navigate=useNavigate()
                    const changestatus = async (item) => {
                        if(!user){navigate("/signin")}

                        setsave(prev=>!prev)
                        try {
                        
                            const res = await Apirequest.post("/user/savepost", { postid: item.id })
                        }
                        catch (err) {
                            setsave(prev=>!prev)
                            console.log(err)
                        }
                    }

                    return (
                        <div className="listitem">

                            <div className="listitemlcon">
                                <div className="listitemlconwrap">
                                    <div className="listitemtop">
                                        <div className="slider">

                                            {slideno !== null &&
                                                <div className="fullslider">
                                                    <ChevronLeftIcon onClick={() => { setdir('l') }} className="slidericons"></ChevronLeftIcon>
                                                    <div className="imgcon">
                                                        <img src={mappost[0].images[slideno]}></img>
                                                    </div>
                                                    <ChevronRightIcon onClick={() => { setdir('r') }} className="slidericons"></ChevronRightIcon>
                                                    <div onClick={() => { setslideno(null) }}>X</div>
                                                </div>}


                                            <div className="lslider"><div>{<img src={mappost[0].images[0]} onClick={() => { setslideno(0) }}></img>}</div></div>
                                            <div className="rslider">{mappost[0].images.slice(1).map((img, ind) =>
                                                <img src={img} key={ind} onClick={() => { setslideno(ind + 1) }}></img>)}</div>
                                        </div>

                                    </div>
                                    <div className="listitembottom">

                                        <div className="bcon1">
                                            <div className="blcon1">
                                                <div>{response.data.title}</div>
                                                <div><div><LocationOnIcon></LocationOnIcon></div>
                                                    <div>{mappost[0].address}</div>
                                                </div>
                                                <div>${mappost[0].price}</div>
                                            </div>
                                            <div className="brcon1">
                                                <div><img src={mappost[0].user.photoimg}></img></div>
                                                <div>{mappost[0].user.name}</div>
                                            </div>
                                        </div>
                                        <div className="bcon2">
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mappost[0].postdetail.desc) }}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listitemrcon">
                                <div className="listitemrconwrap">
                                    <div className="rpart1">
                                        <div className="rpart1tit">General</div>
                                        <div className="rpartits">


                                            <div className="utilitycls">
                                                <div><HomeFilledIcon></HomeFilledIcon></div>
                                                <div >
                                                    <div>Utilities</div>
                                                    <div>{mappost[0].postdetail.utility == "owner" ? <p>Owner is Responsible</p> : <p>Renter is responsible</p>}</div>
                                                </div>
                                            </div>

                                            <div className="petcls">
                                                <div><PetsIcon></PetsIcon></div>
                                                <div>
                                                    <div>Pet Policy</div>
                                                    <div>{mappost[0].postdetail.pet == "allowed" ? <p>Pets Allowed</p> : <p>Pets not Allowed</p>}</div>
                                                </div>
                                            </div>

                                            <div className="moneycls">
                                                <div><MoneyIcon /></div>
                                                <div>
                                                    <div>Property Fees</div>
                                                    <div>{mappost[0].postdetail.property}</div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="rpart2">
                                        <div className="rpart2tit">Room Sizes</div>
                                        <div className="rpart2its">
                                            <div className="rs1"><div><SquareIcon></SquareIcon></div>
                                                <div>{mappost[0].postdetail.size}sqm</div>
                                            </div>
                                            <div className="rs2"><div><BedIcon></BedIcon></div>
                                                <div>{mappost[0].bedroom} bed</div>
                                            </div>
                                            <div className="rs3"><div><BathtubIcon></BathtubIcon></div>
                                                <div>{mappost[0].bathroom} bathroom</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rpart3">
                                        <div className="rpart3tit">Nearby Places</div>
                                        <div className="rpart3its">
                                            <div className="ps1"><div><SchoolIcon></SchoolIcon></div>
                                                <div>
                                                    <div>School</div>
                                                    <div>{mappost[0].postdetail.schooldist > 999 ? mappost[0].postdetail.schooldist / 1000 + "km" : mappost[0].postdetail.schooldist + "m"} away</div>
                                                </div>
                                            </div>
                                            <div className="ps2"><div><DirectionsBusIcon></DirectionsBusIcon></div>
                                                <div>
                                                    <div>Bus Stop</div>
                                                    <div>{mappost[0].postdetail.busdist > 999 ? mappost[0].postdetail.busdist / 1000 + "km" : mappost[0].postdetail.busdist + "m"} away</div>
                                                </div>
                                            </div>
                                            <div className="ps3"><div><StorefrontIcon></StorefrontIcon></div>
                                                <div>
                                                    <div>Restaurant</div>
                                                    <div>{mappost[0].postdetail.restaurantdist > 999 ? mappost[0].postdetail.restaurantdist / 1000 + "km" : mappost[0].postdetail.restaurantdist + "m"} away</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rpart4">
                                        <div className="rpart4tit">
                                            Location
                                        </div>
                                        <div className={`mapv ${slideno != null ? "mapnv" : ""}`}>
                                            <Map posts={mappost}></Map>
                                        </div>
                                    </div>
                                    <div className="rpart5">
                                        <div className='msgsend'>
                                            <div></div>
                                            <div>Send a Message</div>
                                        </div>
                                        <div className={`savepost ${save ? "rmv" : "addv"}`} onClick={() => { changestatus(mappost[0]) }}>
                                            <div ></div>
                                            <div >{save ? "place saved" : "save the place"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                }
            </Await>
        </Suspense>
    )
}