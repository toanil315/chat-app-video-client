import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'

export default function Notification() {
  const {call, callAccepted, answerCall} = useContext(SocketContext)
  
  return (
    <>
      {
        call.isReceiveCall && !callAccepted && (
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%', margin: '15px auto', backgroundColor: '#f1f1f1', borderRadius: 10, padding: 15}}>
            <p style={{fontsize: 25, fontWeight: 600}}>{call.name} is calling you</p>
            <Button variant="contained" color='primary' onClick={answerCall}>
              Accept
            </Button>
          </div>
        )
      }
    </>
  )
}
