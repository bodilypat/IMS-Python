//src/services/supplierService.js 

import api from "./api";

const getAll = async () => (await api.get("suppliers")).data;
const create = async (supplier) => (await api.post("/suppliers", supplier)).data;
const update = async (id, supplier) => (await api.put('/suppliers/${id}', supplier)).data;
const remove = async (id) => (await api.delete(`/suppliers/${id}`)).data;

export default { getAll, create, update, remove };
