// produtoRoute.js
import express from "express"
import {createProduto, getAllProdutos, getProduto, updateProduto, deleteProduto} from "../controllers/produtoController.js" 

const router = express.Router();

// Rota para criar um novo produto
router.post('/produto', createProduto);

// Rota para listar todos os produtos
router.get('/produto', getAllProdutos);

// Rota para obter um produto por ID
router.get('/produto/:cod_produto', getProduto);

// Rota para atualizar um produto
router.put('/produto/:cod_produto', updateProduto);

// Rota para excluir um produto
router.delete('/produto/:cod_produto', deleteProduto);

export default router
