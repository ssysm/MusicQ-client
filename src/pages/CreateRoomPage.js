import React, { useEffect, useState } from 'react';
import { message, Button } from 'antd';
import RoomService from '../services/RoomService';
import AuthService from '../services/AuthService';
export default function CreateRoomPage(props) {

    const [step, setStep] = useState(1);
    const [isPosting, setIsPosting] = useState(false);
    const [roomID, setRoomID] = useState('');
    const _roomService = new RoomService();
    const _authService = new AuthService();

    const handleCreateRoom = ($event) => {
        setIsPosting(true)
        _roomService.createNewRoom()
            .then(data => {
                setIsPosting(false)
                setStep(2);
                setRoomID(data.roomID)
                localStorage.setItem('active-token', data.token);
                localStorage.setItem('uid', data.uid);
            })
            .catch(e => {
                setIsPosting(false)
                message.error('Errored while creating room: ' + e.message);
            })
    }

    const handleAuthorizeSpotify = ($event) => {
        setIsPosting(true);
        _authService.generateSpotifyAuthURL()
            .then(data => {
                setIsPosting(false);
                window.location.replace(data.authorizeURL);
            })
            .catch(e => {
                setIsPosting(false)
                message.error('Errored while authorizing: ' + e.message);
            })
    }

    return (
        <div>
            <h2 style={{textAlign:'center'}}>
                To begin create a room, please follow the following instrctions.
            </h2>
            <div>
                <p>1. Create a new room</p>
                <Button disabled={step !== 1 || isPosting} onClick={handleCreateRoom}>Create Room</Button>
                <div>
                    {
                        step > 1 ?
                            <span>Room created! Your room number is <code>{roomID}</code></span> : null
                    }
                </div>
            </div>
            <div>
                <p>2.Authorize Spotify and become the host!</p>
                <Button disabled={step !== 2 || isPosting} onClick={handleAuthorizeSpotify}>Authorize Spotify</Button>
            </div>
        </div>
    );
}