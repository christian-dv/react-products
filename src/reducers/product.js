/* eslint-disable import/no-anonymous-default-export */
import {
    GET_PRODUCTS,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL
} from "../actions/types";

const initialState = [];

export default function productReducer(state=initialState, action){
    const{type, payload} = action;

    switch(type){
        case GET_PRODUCTS:
            return payload;
        case ADD_PRODUCT_SUCCESS:
            return [...state, action.payload];
        case ADD_PRODUCT_FAIL:
            return state;
        case DELETE_PRODUCT_SUCCESS:
            return state.filter(product => product.id !== payload);
        case DELETE_PRODUCT_FAIL:
            return state;
        case EDIT_PRODUCT_SUCCESS:
            return state.map((product) => product.id === payload.id ? {...product, ...payload} : product );
        case EDIT_PRODUCT_FAIL:
            return state;
        default:
            return state;
        
    }


}
