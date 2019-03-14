import React, { Component } from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import LinkIcon from '@material-ui/icons/Link'
import ShareIcon from '@material-ui/icons/Share'
import Grid from '@material-ui/core/Grid'
import ImageAsync from "react-image-async"
import { getGifsById } from './../../Api'
import ImageLoading from './../../images/image-loading.gif'
import './CarouselCustom.css'

const styles = theme => ({
    paper: {
      margin: '0 auto !important',
      padding: '1rem',
      backgroundColor: '#cccccc'
    },
    fillContainer:{
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'flex-start',
      overflow: 'hidden',
    },
    fillImage:{
      objectFit: 'cover',
      minWidth: '100%',
      minHeight: '100%',
      borderRadius: 7,
      width:'18rem !important',
    },
    dialogStyle:{
        backgroundColor: '#191616c4',
    },
    textFontSize:{
      fontSize: '1rem',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 32,
    },
    shareIcon:{
        margin: theme.spacing.unit,
        fontSize: 22,
    },
    extraInfo:{
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      lineHeight: '1.16667em'
    }
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
                <Dialog onClose={this.handleClose} maxWidth='lg' aria-labelledby="simple-dialog-title" open={this.state.open} className={classes.dialogStyle}>
                    <div className={classes.paper}>
                        <Grid container className={classes.demo} justify="center" spacing={24}>
                            <Grid item key={1} xs={6} className={classes.fillContainer}>
                                <ImageAsync src={data.images.original.url}>
                                    {({ loaded, error }) =>
                                        loaded ? <a href={data.url} target='_blank'><img src={data.images.original.url} alt='modalImage' className={classes.fillImage}/></a> :  <img src={ImageLoading}  className={classes.fillImage} alt='loadingimage'/>
                                    }
                                </ImageAsync>
                            </Grid>
                            <Grid item key={2} xs={6}>
                                {data.source.length !==0 ?<Tooltip title="Open Source"><a style={{float:'right'}} href={data.source} target='_blank'><LinkIcon className={classes.icon}/></a></Tooltip>:null}
                                <Tooltip title="Share on whatsapp"><a href={`whatsapp://send?text=${encodeURIComponent(data.url)}`} target='_blank' style={{marginTop:'0.4rem', float:'right'}}><ShareIcon className={classes.shareIcon} /></a></Tooltip><br/>
                                <h2 className={classes.extraInfo}>{data.title}</h2><br/>
                                <span className={classes.textFontSize}><b>ID</b>: {data.id}</span><br/>
                                <span className={classes.textFontSize}><b>Rating</b>: {data.rating}</span><br/>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>:null}
            </>
        )
    }
}
export default withStyles(styles)(Carousel)