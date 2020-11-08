const prod = {
    url: {
        API_BASE: 'https://api.musicq.space',
    }
};

const dev = {
    url: {
        API_BASE: 'http://localhost:3000'
    }
};
export default process.env.NODE_ENV === 'development' ? dev : prod;