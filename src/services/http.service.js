import axios from 'axios';

import {LOGIN} from '../configs/url.config';
import {ACCESS_TOKEN, BASE_URL, IS_LOGGED_IN} from '../configs/variables.config';
// import {toast} from 'react-toastify';

class HttpService {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3002";

        axios.interceptors.request.use((req) => {
            console.log('CONFIG: ', req);
            const token = localStorage.getItem(ACCESS_TOKEN);

            if (req.url !== LOGIN) {
                // req.headers['Authorization'] = `${token}`;
                // req.setHeader("Access-Control-Allow-Origin", "*");
                // req.headers['Access-Control-Allow-Origin'] = '*'
                // req.headers['Access-Control-Allow-Credentials'] = 'true'

            }

            return req;
        }, (error) => {
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
                console.log('Interceptor response success', response);

                return response;
            },
            (error) => {
            console.log(error)
                console.log('Interceptor response error' , error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!'));
                if (error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!')) {
                    localStorage.setItem(IS_LOGGED_IN, false.toString());
                    // window.location.href = 'http://localhost:3000' + PATHS.SIGN_IN;
                } else {

                    // toast.error(error.response.data)
                }
                return Promise.reject(error);
            })
    }

    get(url, config) {
        return axios.get(url, config);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        return axios.put(url, data, config);
    }

    patch(url, data, config) {
        return axios.patch(url, data, config);
    }

    delete(url, config) {
        return axios.delete(url, config);
    }
}

export default new HttpService();