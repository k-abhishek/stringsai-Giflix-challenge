import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames'; 

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '2rem',
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  netflixColor: {
    color: '#e50914',
  },
  appbarStyle: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    height: '5rem',
  },
  title: {
    fontWeight: 100,
    position: 'relative',
    fontFamily: 'graphique-regular',
    fontSize: '4rem',
    margin: '0 auto'
  }
};

function Appbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbarStyle}>
        <Toolbar variant="dense">
          {/*<IconButton className={classNames(classes.menuButton, classes.netflixColor)} aria-label="Menu">
            <MenuIcon  style={{height: '1.5em', width: '2em'}}/>
          </IconButton>*/}
          <Typography variant="h4" className={classNames(classes.netflixColor, classes.title)}>
            Giflix
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Appbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Appbar);
