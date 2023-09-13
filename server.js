import express from "express";
import cors from "cors";
import db from "./config/database.js";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import categoriaRoute from "./routes/categoriaRoute.js";
import pedidoRoute from "./routes/pedidoRoute.js";
import produtoRoute from "./routes/produtoRoute.js";

import Categoria from "./models/categoriaModel.js";
import Pedido from "./models/pedidoModel.js";
import Produto from "./models/produtoModel.js";

const server = express();
server.use(express.json());
server.use(cors());

try {
  await db.authenticate();
  console.log("Conexão com o MySQL estabelecida!");
} catch (e) {
  console.log("Conexão com o MySQL não estabelecida", e);
}

Produto.associate = (models) => {
  Produto.hasMany(models.Categoria, { foreignKey: 'id_categoria', as: 'categoria' });
};

Pedido.associate = (models) => {
  Pedido.hasMany(models.Produto, { foreignKey: 'cod_produto', as: 'produto' });
};

Produto.belongsTo(Categoria, { foreignKey: 'id_categoria', allowNull: true });
Pedido.belongsTo(Produto, { foreignKey: 'cod_produto', allowNull: true });
Pedido.belongsTo(Produto, { foreignKey: 'cod_produto' });
Produto.hasMany(Pedido, { foreignKey: 'cod_produto' });

const token = uuidv4(); // Gera um valor de token aleatório
console.log("Token JWT:", token);

// Endpoint de autenticação
server.post('/auth', (req, res) => {
  const { username, password } = req.body;

  // Aqui você deve fazer a verificação das credenciais do usuário
  // Se as credenciais forem válidas, você pode gerar o token JWT

  const payload = {
    username: username,
    // Outros dados do usuário, se necessário
  };

  const chaveSecreta = 'sua_chave_secreta';

  jwt.sign(payload, chaveSecreta, (err, token) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao gerar o token JWT' });
    } else {
      res.json({ token });
    }
  });
});

// Middleware para verificar o token JWT
server.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (token === token) { // Verifica se o token enviado é igual ao token gerado anteriormente
    // Token JWT válido, continua com a próxima rota
    next();
  } else {
    res.status(401).json({ error: 'Acesso não autorizado' });
  }
});

server.use(categoriaRoute);
server.use(pedidoRoute);
server.use(produtoRoute);

server.listen(5000, () => console.log("Servidor executando em http://localhost:5000"));
