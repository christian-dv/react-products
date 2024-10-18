/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

class ProductService{

    getProducts(){
       return axios.get(API_URL+"products", {headers: authHeader()});
    }

    addProduct(nombre, precio){
        return axios.post(API_URL + "products", {nombre, precio}, {headers: authHeader()});
    }

    deleteProduct(id){
        return axios.delete(API_URL+ "products/"+id, {headers: authHeader()});
    }

    editProduct(id,nombre,precio){
        return axios.put(API_URL+ "products/"+id,{nombre,precio},{headers: authHeader()})
    }
}

export default new ProductService();
