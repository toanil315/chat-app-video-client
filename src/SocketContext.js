import React, {useState, createContext, useEffect, useRef} from 'react';
import Peer from 'simple-peer';
import { io } from 'socket.io-client'

const socket = io('https://chat-video-app-by-jsm.herokuapp.com/');
const SocketContext = createContext();

const ContextProvider = ({children}) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('')

    const myVideoRef = useRef(null);
    const userVideoRef = useRef(null);
    const connection = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((currentStream) => {
                setStream(currentStream);
                myVideoRef.current.srcObject = currentStream;
            });
        
        socket.on('me', (id) => {
            setMe(id)
        })

        socket.on('calluser', ({signal, from, name}) => {
            setCall({isReceiveCall: true, from, name, signal});
        })

        socket.on('callended', () => {
            leaveCall()
        })
    }, [])

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({initiator: false, trickle: false, stream});
        
        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to: call.from});
        })

        peer.on('stream', (currentStream) => {
            userVideoRef.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connection.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream});
        
        peer.on('signal', (data) => {
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name});
        })

        peer.on('stream', (currentStream) => {
            userVideoRef.current.srcObject = currentStream;
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })

        connection.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connection.current.destroy();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            callEnded,
            stream,
            me,
            name,
            setName,
            myVideoRef,
            userVideoRef,
            leaveCall,
            answerCall,
            callUser
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext}