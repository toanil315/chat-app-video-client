import React, { useContext, useState } from "react";
import { Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from "../SocketContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

export default function Option({ children }) {
  const { me, name, setName, callAccepted, callEnded , callUser, leaveCall} = useContext(SocketContext);
  const classes = useStyles();
  const [idToCall, setIdToCall] = useState("");

  console.log(me)

  return (
    <div>
      <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
          <form autoComplete="off" noValidate className={classes.root}>
            <Grid container className={classes.gridContainer}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  fullWidth
                />
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Copy to clipboard
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h6">
                  Id To Call
                </Typography>
                <TextField
                  label="Id"
                  value={idToCall}
                  onChange={(e) => {
                    setIdToCall(e.target.value);
                  }}
                  fullWidth
                />

                {callAccepted && !callEnded ? (
                  <div className={classes.margin}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<PhoneDisabled fontSize="large" />}
                      onClick={leaveCall}
                    >
                      Hang up
                    </Button>
                  </div>
                ) : (
                  <div className={classes.margin}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Phone fontSize="large" />}
                      onClick={() => {
                        callUser(idToCall)
                      }}
                    >
                      Call
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </form>
          {children}
        </Paper>
      </Container>
    </div>
  );
}
