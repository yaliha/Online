import {LOGIN, PRODUCTS} from '../configs/url.config';
import http from '../services/http.service';
import {ACCESS_TOKEN, IS_LOGGED_IN} from '../configs/variables.config';


export async function login(data) {
    try {
        const response = await http.post('/auth/login', data);
        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        localStorage.setItem(IS_LOGGED_IN, true.toString());
        return response.data;
    } catch (e) {

        return Promise.reject(e);
    }
}

export async function getData(url) {

    try {
        const response = await http.get(url);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function Delete(url) {
    try {
        const response = await http.delete(`${PRODUCTS}/${url}`);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function put(url, data) {
    try {
        const response = await http.put(`${url}`, data);
        return response.data;
    } catch (e) {
        return Promise.reject(e);
    }
}


export async function post(url, data) {
    try {
        const response = await http.post(`${url}`, data);
        return response.data;
    } catch (e) {

        return Promise.reject(e);
    }
}