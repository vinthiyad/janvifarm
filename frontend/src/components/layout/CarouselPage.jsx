import { useState } from 'react';
import {Carousel} from 'react-bootstrap';  

export default function CarouselPage(){
    const [carousel, setCarousel] = useState([
        { 
            "image"     : "/images/carousel/FarmImage1.jpeg",
            "caption"   : " Fresh Organic Products from Janvi Farm To Your Door !!! \n 50% Offer Hurry Up "
        },
        { 
            "image"     : "/images/carousel/FarmImage2.jpeg",
            "caption"   : " Fresh Organic Katla and Jilabe Fish  from Janvi Farm To Your Door "},
        {
            "image"     : "/images/carousel/FarmImage3.jpeg" ,
            "caption"   : " Fresh Poultry Products from Janvi Farm To Your Door !!!"
        },
        { 
            "image"     : "/images/carousel/FarmImage4.jpeg",
            "caption"   : " Fresh Milk Products from Janvi Farm To Your Door !!!"
        },
        { 
            "image"     : "/images/carousel/FarmImage7.jpeg",
            "caption"   : " Fresh Meat Products from Janvi Farm To Your Door !!!"
        },
        { 
            "image"     : "/images/carousel/FarmImage6.jpeg",
            "caption"   : " Vist Janvi Farm at anytime ,\n Vasavappapurm,Vallanadu,Tuticorin,Tamilnadu, 628252. "
        },
        { 
            "image" : "/images/carousel/FarmImage5.jpeg"},
        
        ]);  
    return(
        <div className='container-fluid' > 
        <Carousel pause="hover" fade interval={3000}>
            {carousel && carousel.map(image => (
                <Carousel.Item style={{'height':"300px"}} >    
                    <img   className="d-block w-100 min-vh-100"  src={image.image}  />
                    <Carousel.Caption className='d-none d-sm-block text-align: center ' style={{'color' : 'darkblue'}}>
                        <h1>{image.caption}</h1>      
                    </Carousel.Caption>
                </Carousel.Item>    
            ))}
       </Carousel>
       </div>
    )
}