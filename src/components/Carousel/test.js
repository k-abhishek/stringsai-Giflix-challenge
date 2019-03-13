import React from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import ImageAsync from "react-image-async"
import ImageLoading from './../../images/image-loading.gif'
import './CarouselCustom.css'

const Carousel = props => {
 return( 
    <InfiniteCarousel
        breakpoints={[
        {
            breakpoint: 500,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false,
            },
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            },
        },
        ]}
        arrows={true}
        dots={false}
        showSides={false}
        sidesOpacity={0}
        incrementalSides={true}
        lazyLoad={true}
        slidesToScroll={3}
        slidesToShow={5}
        animationDuration={10}
        placeholderImageSrc={ImageLoading}
        scrollOnDevice={true}>
        {props.data.map(item => {
           return( 
            <div key={item.id}>
                    <ImageAsync src={item.images.fixed_height.url}>
                        {({ loaded, error }) =>
                            loaded ? <img src={item.images.fixed_height.url} className={'image'} alt="imagebroken"/> :  <img src={ImageLoading} alt='loadingimage'/>
                        }
                    </ImageAsync>
                </div>
           )
        })}
    </InfiniteCarousel>
  )
}
export default Carousel