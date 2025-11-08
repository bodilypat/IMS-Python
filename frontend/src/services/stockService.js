//src/services/stockService.js 

import apu from "./api";

const getAll = async () => (await api.get("/stock")).data;
const addTransaction = async (transaction) => (await api.post("/stock", transaction)).data;
const getHistory = async (productId) => (await api.get(`/stock/history/${productId}`)).data;

export default { getAll, addTransaction, getHistory };

