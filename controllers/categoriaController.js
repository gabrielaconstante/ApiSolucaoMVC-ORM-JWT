// categoriaController.js
import Categoria from "../models/categoriaModel.js"

export const createCategoria = async (req, res) => {
    try {
        await Categoria.create(req.body)
        res.json({
            "message":"Categoria criada com sucesso"
        })
    } 
    catch (error) {
        console.log("Erro ao Inserir categoria", error)
    }
};


export const deleteCategoria = async(req, res) => {
    try {
        const {id_categoria} = req.params;

        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            return res.status(404).json({message: 'Categoria não encontrada'});
        };

        await categoria.destroy();

        res.json({message: 'Categoria excluida com sucesso'});
    } catch (error) {
        console.error('Erro ao excluir categoria: ',error);
        res.status(500).json({message: 'Erro ao excluir categoria'});
    }
};

export const getCategoria = async (req, res) => {
    try {
        const {id_categoria} = req.params;

        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            return res.status(404).json({message: 'Categoria não encontrada'});
        }
        
        res.json(categoria);
    } catch (error) {
        console.error('Erro ao encontrar categoria: ',error);
        res.status(500).json({message: 'Erro ao encontrar categoria'});
    }
};

export const getAllCategorias = async(req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json({categorias});
    } catch (error) {
        console.error('Erro ao listar categorias: ',error);
        res.status(500).json({message: 'Erro ao listar categoria'});
    }
};

export const updateCategoria = async(req, res) => {
    try {
        const {id_categoria} = req.params;
        const {nome_categoria} = req.body;

        const categoria = await Categoria.findByPk(id_categoria);
        if (!categoria) {
            return res.status(404).json({message: 'Categoria não encontrada'});
        };

        categoria.nome_categoria = nome_categoria;
        await categoria.save();

        res.json({message: 'Categoria atualizada com sucesso', categoria});
    } catch (error) {
        console.error('Erro ao atualizar categoria: ',error);
        res.status(500).json({message: 'Erro ao atualizar categoria'});
    }
};