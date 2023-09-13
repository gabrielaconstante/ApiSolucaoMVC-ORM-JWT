// categoriaRoute.js
import express from "express"
import {createCategoria, getAllCategorias, getCategoria, updateCategoria, deleteCategoria} from "../controllers/categoriaController.js" 

const router = express.Router();

// Rota para criar uma nova categoria
router.post('/categoria', createCategoria);

// Rota para listar todas as categorias
router.get('/categoria', getAllCategorias);

// Rota para listar uma categoria
router.get('/categoria/:id_categoria', getCategoria);

// Rota para atualizar uma categoria
router.put('/categoria/:id_categoria', updateCategoria);

// Rota para deletar uma categoria
router.delete('/categoria/:id_categoria', deleteCategoria);

export default router