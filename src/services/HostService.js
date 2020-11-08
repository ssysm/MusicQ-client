import axios from 'axios';
import config from '../Constants'; 
export default class HostService {
    getDevices = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.get(config.url.API_BASE + '/host/devices',{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    play = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/host/play',{},{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    pause = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/host/pause',{},{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    getCurrentPlaying = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.get(config.url.API_BASE + '/host/playing',{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    skipToNext = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/host/next',{},{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    skipToPervious = () => {
        const authToken = localStorage.getItem('active-token');
        return axios.get(config.url.API_BASE + '/host/previous',{},{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    }
}