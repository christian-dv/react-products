import {
    GET_PRODUCTS,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    SET_MESSAGE
} from "./types";

import ProductService from "../services/product.service";

export const getProducts = () => async (dispatch) =>{
    try{
        const response = await ProductService.getProducts();
        console.log(response.data);
        dispatch({
            type: GET_PRODUCTS,
            payload: response.data,
        });

        return response.data;
    }catch(err){
        const message = err.response?.data?.message || err.message || "Error";
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        console.error("Error en obtener productos ", message);
    }
};

export const addProduct = (nombre,precio) => async (dispatch) =>{
    try{
        const response = await ProductService.addProduct(nombre, precio);
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: response.data,
        });
    }catch(err){
        const message = err.response?.data?.message || err.message || "Error";
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        dispatch({
            type: ADD_PRODUCT_FAIL
        });
    }
};

export const editProduct = (id,nombre,precio) => async (dispatch) =>{
    try{
        const response = await ProductService.editProduct(id,nombre, precio);
        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: response.data,
        });
    }catch(err){
        const message = err.response?.data?.message || err.message || "Error";
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        dispatch({
            type: EDIT_PRODUCT_FAIL
        });
    }
};

export const deleteProduct = (id) => async (dispatch) =>{
    try{
        await ProductService.deleteProduct(id);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: id,
        });
    }catch(err){
        const message = err.response?.data?.message || err.message || "Error";
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        dispatch({
            type: DELETE_PRODUCT_FAIL
        });
    }
};



