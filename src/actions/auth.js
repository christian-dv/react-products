import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from "./types";

import AuthService from "../services/auth.service";

export const register = (nombre, nombreUsuario, email, password) => (dispatch) =>{
    return AuthService.register(nombre,nombreUsuario,email,password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) =>{
            const message = 
              (error.response && error.response.data &&
                error.response.data.message) || error.message || error.toString();
              
                dispatch({
                    type: REGISTER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
        }
    );
};

export const login = (nombreUsuario, password) => (dispatch) => {
    return AuthService.login(nombreUsuario, password).then(
        (data) => {
            console.log(data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            return Promise.resolve();
        },
        (error) => {
            let message;
            if (error.response && error.response.status === 401) {
                message = 'Ops, parece que los datos son incorrectos!';
            } else {
                message = 
                  (error.response && error.response.data && 
                    error.response.data.message) || error.message || error.toString();
            }

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) =>{
    AuthService.logout();

    dispatch({
        type: LOGOUT
    });
};