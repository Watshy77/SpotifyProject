import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1/'
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('spotify_token');

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        }

        return config;
    }
)

export {
    instance
}