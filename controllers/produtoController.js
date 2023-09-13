// produtoController.jss
import Produto from '../models/produtoModel.js';
import Pedido from '../models/pedidoModel.js';

//Função para criar um novo produto
export const createProduto = async (req, res) => {
  try {
    // Extrair os dados do produto do corpo da requisição
    
    await Produto.create(req.body)
    const { cod_produto, nome_produto, qtde_produto, id_categoria } = req.body;

    // Verificar se a quantidade do produto atende às regras de pedido
    let qtdePedido = 0;
    if (qtde_produto <= 3) {
      qtdePedido = 4;
    } else if (qtde_produto > 3 && qtde_produto < 7) {
      qtdePedido = 3;
    }

    // Criar o novo produto
    // const produto = await Produto.create({
    //   cod_produto,
    //   nome_produto,
    //   qtde_produto,
    //   id_categoria,
      
    // });
    res.json({
      "message":"Produto criado com sucesso"
  })
    // Registrar o pedido se necessário
    if (qtdePedido > 0) {
      await Pedido.create({
        cod_produto,
        qtde_pedido: qtdePedido,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};













export const getProduto = async (req, res) => {
  try {
      const {cod_produto} = req.params;

      const produto = await Produto.findByPk(cod_produto);
      if (!produto) {
          return res.status(404).json({message: 'Categoria não encontrada'});
      }
      res.json(produto);
  } catch (error) {
      console.error(error);
      res.status(500).json({message:'Erro ao obter o produto'});
  }
};

export const getAllProdutos = async(req, res) => {
  try {
      const produtos = await Produto.findAll();
      res.json({produtos});
  } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Erro ao listar produtos'});
  }
};

// Função para atualizar um produto
export const updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_produto, qtde_produto } = req.body;

    // Verificar se o produto existe
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Atualizar os dados do produto
    produto.nome_produto = nome_produto;
    produto.qtde_produto = qtde_produto;
    await produto.save();

    // Retornar o produto atualizado
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

// Função para excluir um produto
export const deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o produto existe
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Excluir o produto
    await produto.destroy();

    // Retornar uma resposta de sucesso
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o produto' });
  }
};
