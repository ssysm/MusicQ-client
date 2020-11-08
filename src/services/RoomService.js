import axios from 'axios';
import config from '../Constants'; 

export default class RoomService { 
    createNewRoom = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/room',{ },{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    joinRoom = (roomID) => {
        return axios.post(config.url.API_BASE + '/room/' + roomID + '/join' ,{ })
        .then(res => res.data);
    }

    getRoomDetail = (roomID) => {
        return axios.get(config.url.API_BASE + '/room/' + roomID + '/detail')
        .then(res => res.data);
    };

    removeTrackFromQueue = (trackURI) => {
        const authToken = localStorage.getItem('active-token');
        return axios.patch(config.url.API_BASE + '/room/queue/track/remove', {
            trackURI
        },{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    deleteRoom = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.delete(config.url.API_BASE + '/room',{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    addTrackToQueue = (trackURI) => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/room/queue',{ 
            trackURI
        },{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    }

}