//src/services/productService.js 

import api from "./api";

const getAll = async () => (await api.get("/products")).data;
const getById = async (id) => (await api.get(`/products/${id}`)).data;
const create = async (data) => (await api.post("/products", data)).data;
const update = async (id, data) => (await api.put(`/products/${id}`, data)).data;
const remove = async (id) => (await api.delete(`/products/${id}`)).data;

export default { getAll, getById, create, update, remove };
