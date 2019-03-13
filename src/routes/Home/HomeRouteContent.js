import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Carousel, Navbar } from './../../components/index'
import Typography from '@material-ui/core/Typography'; 
import {getGifs} from './../../Api'
import InfiniteScroll from 'react-infinite-scroller'
import Loading from './../../images/waiting.gif'
import InfiniteLoading from './../../images/giphy.gif'
import '../../../public/fonts/fonts.css'

const styles = theme => ({
    body: {
        margin: [0, 'auto'],
        padding: 40,
        width: '100%',
    },
    fonts: {
        fontFamily: 'Amatic SC, cursive',
        fontSize: '2rem'
    },
    header: {
        fontSize: '5rem',
    },
    loadingImg: {
        position: 'absolute',
        top: '58%',
        left: '50%',
        width: '500px',
        height: '500px',
        marginTop: '-250px', /* Half the height */
        marginLeft: '-250px',/* Half the width */
        zIndex: -10,
    },
    secondLoader: {
        position: 'relative',
        margin: '0 auto',
        width: '15%',
        display: 'block', 
    },
    headerTitle:{
        color : '#e5e5e5',
        paddingLeft: '3rem',
        textTransform: 'Capitalize',
        fontWeight: '100',
        marginBottom: 0,
        marginTop: '2rem',
        fontFamily: 'Finger Paint, cursive'
    },
    carouselStyle: {
        maxHeight: '9rem'
    },
    loadingHeader: {
        fontFamily: 'graphique-regular',
        color: '#e50914',
        fontSize: '6rem',
        fontWeight: 100,
        textAlign: 'center',
        zIndex: 1,
    }
});
class HomeRouteContent extends Component {
    state= {
        categories: ['drunk', 'embarrased', 'excited', 'frustated', 'happy', 'hungry', 'inspired', 'lonely', 'love', 'nervous', 'pain', 'reaction', 'relaxed', 'sad', 'sassy', 'scared', 'shocked', 'sick', 'stressed', 'surprised', 'suspicious', 'tired', 'unimpressed','angry', 'bored', 'disapointed'],
        gifData: {},
        hasMoreData: true,
    }

    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    loadData = async pageNum => {
        const params = this.state.categories.slice((pageNum*4) ,4+(pageNum*4))
        if(params.length === 0){
            this.setState({hasMoreData:false})
        }
        const promises = getGifs(params)
        const resp = await Promise.all(promises)
        let results = {}; 
        let gifData = {...this.state.gifData}
        resp.forEach((item, index) => {
            results[params[index]] = item.data.data
        })
        this.setState({
            gifData: {...gifData, ...results}
        })

    }

    componentDidMount() {
        this.loadData(0)
    }

    render(){
        const { classes } = this.props
        const { gifData } = this.state;

        return(
            <>
                {this.isEmpty(gifData)? <div >
                <h3 className={classes.loadingHeader}>
                    Giflix
                </h3>
                <img src={Loading} alt="loading" className={classes.loadingImg}/>
                </div>:
                    <>
                        <Navbar />
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.loadData}
                            hasMore={this.state.hasMoreData}
                            initialLoad={false}
                            useWindow={true}
                            loader={<img src={InfiniteLoading} alt="loading" className={classes.secondLoader}/>}>
                            {
                                Object.keys(gifData).map(item => {
                                    return (
                                        <div key={item}>
                                             <Typography component="h3" variant="display1" gutterBottom className={classes.headerTitle}>
                                                {item}
                                            </Typography>
                                            <Carousel data={gifData[item]} mode={item} checkEmptyObject={this.isEmpty} />
                                        </div>
                                    )
                                })
                            }
                        </InfiniteScroll>
                    </>
                }
            </>
        )
    }
}

export default withStyles(styles)(HomeRouteContent)