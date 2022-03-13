import React, {useContext} from 'react'
import {Grid, Typography, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

export default function VideoPlayer() {
  const {stream, callAccepted, callEnded, name, setName, myVideoRef, userVideoRef, call} = useContext(SocketContext);
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.gridContainer}>
        {/* OUR VIDEO */}
        {
          stream && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant='h5' gutterBottom>{name || 'Name'}</Typography>
                <video playsInline muted ref={myVideoRef} autoPlay className={classes.video} />
              </Grid>
            </Paper>
          )
        }
        {/* USER VIDEO */}
        {
          callAccepted && !callEnded && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant='h5' gutterBottom>{call.name}</Typography>
                <video playsInline ref={userVideoRef} autoPlay className={classes.video} />
              </Grid>
            </Paper>
          )
        }
      </Grid>
    </div>
  )
}
