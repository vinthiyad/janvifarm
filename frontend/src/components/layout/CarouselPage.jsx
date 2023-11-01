import { useState } from 'react';
import {Carousel} from 'react-bootstrap';  

export default function CarouselPage(){
    const [carousel, setCarousel] = useState("/images/LandingPage2.jpg");  
    return(

        <Carousel pause="hover">
    
        <Carousel.Item >
            <img className="" src={carousel}  height="300" width="100%"/> 
       </Carousel.Item>    
       
        ) 
       </Carousel>


    )
}