import axios from 'axios';
import config from '../Constants'; 
export default class SearchService {
    search = (keyword, offset = 0) => {
        const authToken = localStorage.getItem('active-token');
        return axios.get(config.url.API_BASE + '/search?keyword=' + keyword + '&offset=' + offset,{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };

    trackLookup = (trackURI) => {
        const authToken = localStorage.getItem('active-token');
        return axios.post(config.url.API_BASE + '/track',{
            trackURI
        },{
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => res.data);
    };
}