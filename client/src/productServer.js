import axios from "axios"
let baseUrl="https://final-project-n18z.onrender.com/products";

export function getProductById(id){
    return axios.get(`${baseUrl}/{id}`);
}

export function getAllProducts(user) {
    return axios.post(baseUrl + "/login", user)
}

export function deleteById(user) {
    return axios.post(baseUrl + "/login", user)
}

export function addProduct(user) {
    return axios.post(baseUrl + "/login", user)
}

export function getAllProducts(user) {
    return axios.post(baseUrl + "/login", user)
}

export function getAllProducts(user) {
    return axios.post(baseUrl + "/login", user)
}