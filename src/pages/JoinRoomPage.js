import React,{ useEffect, useState } from 'react';
import { message } from 'antd';
import RoomService from '../services/RoomService';
import AuthService from '../services/AuthService';

export default function JoinRoomPage(props) {
    
    const [ step, setStep ] = useState(1);
    const [ roomID, setRoomID ] = useState('');
    const [ userID, setUserID ] = useState('');
    const [ isPosting, setIsPosting ] = useState(false);
    const _authService = new AuthService();
    const _roomService = new RoomService();

    const handleJoinRoom = () => {
        setIsPosting(true);
        _roomService.joinRoom(roomID)
        .then(data => {
            setIsPosting(false);
            setStep(2);
            setUserID(data.uid);
            localStorage.setItem('active-token', data.token);
            localStorage.setItem('uid', data.uid);
        })
        .catch(e=>{
            setIsPosting(false)
            message.error('Errored while joining: ' + e.message);
        })
    };

    const handleAuthorizeSpotify = ($event) => {
        setIsPosting(true);
        _authService.generateSpotifyAuthURL()
        .then(data => {
            setIsPosting(false);
            window.location.replace(data.authorizeURL);
        })
        .catch(e=> {
            setIsPosting(false)
            message.error('Errored while authorizing: ' + e.message);
        })
    }

    return (
        <div>
            <div>
                <input type="text"
                maxLength={8}
                minLength={8}
                onChange={($event)=>{ setRoomID($event.target.value) }}/>
                <button onClick={handleJoinRoom}
                    disabled={step !== 1 || isPosting || ( roomID.length !== 8) }
                >Join</button>
                {
                        step > 1 ? 
                    <span>Room join! Your user id is <code>{userID}</code></span> : null
                }
            </div>
            <div>
                <button 
                disabled={step !== 2 || isPosting}
                onClick={handleAuthorizeSpotify}>Authorize Spotify</button>
            </div>
        </div>
    )
};