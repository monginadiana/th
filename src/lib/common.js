import axios from "axios";
import { API_ROUTES } from '../utils/constant'

export function storeTokenInLocalStorage(token) {
    localStorage.setItem(token)
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token')
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null }

    try {
        const token = getTokenFromLocalStorage()
        if (!token) {
            return defaultReturnObject;
        }
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { authenticated } = response.data;
        return authenticated ? response.data : false;
    } catch (error) {
        console.log('getAuthenticatedUser, Something Went Wrong', error);
        return defaultReturnObject;
    }
}