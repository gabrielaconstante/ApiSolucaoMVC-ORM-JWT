// pedidoController.js
import Produto from '../models/produtoModel.js';
import Pedido from '../models/produtoModel.js';

export const createPedido = async(req, res) => {
    try {
        const produto = await Produto.findOne({ where: {cod_produto}});
        if(!produto){
            return res.status(404).json({message: 'Produto não encontrado'});
        }

        let qtde_pedido_registrado;

        if(produto.qtde_produto <= 3){
            qtde_pedido_registrado = 4;
        } else if(produto.qtde_produto < 7){
            qtde_pedido_registrado = 3;
        } else {
            return res.status(400).json({message: 'Quantidade invélida para pedidoo'});
        }

        const pedido = await Pedido.create({ 
            cod_poduto,
            qtde_pedido: qtde_pedido_registrado,
        });

        res.status(201).json({message: 'Pedido criado com sucesso', pedido: novoPedido});
        
    } catch (error) {
        console.error('Erro ao criar pedido:', erros);
        res.status(500).json({message: 'Erro ao criar pedido'});
    }
};

export const deletePedido = async (req, res) => {
    try {
        
        const {num_pedido} = req.params;

        const pedido = await Pedido.findByPk(num_pedido);
        if(!pedido){
                    return res.status(404).json({message: 'Pedido não encontrado'});
                }
        
        await pedido.destroy();
        res.json({message: 'Pedido excluído com sucesso'});
    } catch (error) {

        console.error('Erro ao excluir pedido:',error);
        res.status(500).json({message: 'Erro ao excluir pedido'});
    }
};

export const updatePedido = async (req, res) => {

    try {
        const {num_pedido} = req.params;
        const {qtde_pedido} = req.body;

        const pedido = await Pedido.findByPk(num_pedido);
        if(!pedido){
            return res.status(404).json({message: 'Pedido não encontrado'});
        }

        pedido.qtde_pedido = qtde_pedido;
        await pedido.save();
        res.json({message: 'Pedido alterado com sucesso', pedido});
    } catch (error) {
       console.error('Erro ao modificar pedido:',error);
       res.status(500).json({message: 'Erro ao modificar pedido'}); 
    }
};

export const getPedido = async (req, res) => { 

    try {
        const {num_pedido} = req.params;

        const pedido = await Pedido.findByPk(num_pedido,{include: Produto});
        if (!pedido){
            return res.status(404).json({message: 'Pedido não encontrado'});
        }

        res.json({message: 'Pedido alterado com sucesso', pedido});
    } catch (error) {
        console.error('Erro ao modificar pedido:',error);
        res.status(500).json({message: 'Erro ao modificar pedido'});
    }
};