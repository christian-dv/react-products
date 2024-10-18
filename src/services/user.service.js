/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/actuator/health";

class UserService{

    getPublicContent(){
        return axios.get(API_URL);
    }

    getGreetings(){
        return axios.get(API_URL, {headers: authHeader() });
    }
}

export default new UserService();
