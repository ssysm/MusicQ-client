import axios from 'axios';
import config from '../Constants'; 
export default class AuthService {
    generateSpotifyAuthURL = ()=> {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/auth/generate-auth-url',{},{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    }
}