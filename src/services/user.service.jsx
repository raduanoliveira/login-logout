import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8000/api/test/'

const getPublicContent = () => {
    return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
    console.log('chamou o user board');
    return axios.get(API_URL + 'user' , {headers: authHeader()})
} 

const getModeratorBoard = () => {
    return axios.get(API_URL + 'mod' , {headers: authHeader()})
}

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', {headers: authHeader()})
}

const exportedObject = { getPublicContent, getUserBoard, getModeratorBoard, getAdminBoard}

export default exportedObject