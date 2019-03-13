import React, { Component } from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import ImageAsync from "react-image-async"
import { getGifsById } from './../../Api'
import ImageLoading from './../../images/image-loading.gif'
import './CarouselCustom.css'

const styles = theme => ({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      top: '50%',
      left: '50%',
      width: 'auto',
      height: 'auto',
      marginTop: '-250px', /* Half the height */
      marginLeft: '-250px',/* Half the width */
    },
  });

class Carousel extends Component {

    state={
        open: false,
        data:{},
        id:'',
        mode:'',
    }
    handleOpen = async (id, mode) => {
        const response = await getGifsById(id)
        this.setState({ open: true, id: id, mode: mode, data:response});
    };


    handleClose = () => {
        this.setState({ open: false, id:'', data: {} });
    };

    render(){
        const {classes} = this.props
        const { data } = this.state
        return( 
            <>
                <InfiniteCarousel
                    breakpoints={[
                    {
                        breakpoint: 500,
                        settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        slidesSpacing:20
                        },
                    },
                    {
                        breakpoint: 1000,
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
                    slidesToShow={4}
                    animationDuration={10}
                    slidesSpacing={30}
                    scrollOnDevice={true}>
                    {this.props.data.map(item => {
                    return( 
                        <div key={item.id}>
                                <ImageAsync src={item.images.fixed_height.url}>
                                    {({ loaded, error }) =>
                                        loaded ? <img src={item.images.fixed_height.url} onClick={()=>this.handleOpen(item.id, this.props.mode)} className={'image'} alt="imagebroken" /> :  <img src={ImageLoading} style={{width:'18rem !important'}} alt='loadingimage'/>
                                    }
                                </ImageAsync>
                            </div>
                    )
                    })}
                </InfiniteCarousel>
                {!this.props.checkEmptyObject(this.state.data)?
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">{data.title}</DialogTitle>
                    <div>
                        <img src={data.images.fixed_height_small.url} alt='modalImage'/>
                    </div>
                </Dialog>:null}
            </>
        )
    }
}
export default withStyles(styles)(Carousel)