// pedidoRoute.js
import express from "express"
import {createPedido, deletePedido, updatePedido, getPedido} from "../controllers/pedidoController.js" 

const router = express.Router();

// Rota para criar um pedido
router.post('/pedido', createPedido);

// Rota para deletar um pedido
router.delete('/pedido/:num_pedido', deletePedido);

// Rota para atualizar um pedido
router.put('/pedido/:num_pedido', updatePedido);

// Rota para obter um produto pedido
router.get('/pedido/:num_pedido', getPedido);

export default router
