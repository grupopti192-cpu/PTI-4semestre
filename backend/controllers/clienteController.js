const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.json');

function lerBanco() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function salvarBanco(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

exports.atualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  const db = lerBanco();
  const cliente = db.clientes.find(c => c.id === parseInt(id));

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  cliente.nome = nome ?? cliente.nome;
  cliente.email = email ?? cliente.email;
  cliente.telefone = telefone ?? cliente.telefone;

  salvarBanco(db);
  res.json({ sucesso: true, cliente });
};

exports.adicionarEndereco = (req, res) => {
  const { id } = req.params;
  const { nome, rua, bairro } = req.body;

  const db = lerBanco();
  const cliente = db.clientes.find(c => c.id === parseInt(id));

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  if (!cliente.enderecos) cliente.enderecos = [];

  const novoEndereco = {
    id: Date.now(),
    nome,
    rua,
    bairro
  };

  cliente.enderecos.push(novoEndereco);
  salvarBanco(db);
  res.json({ sucesso: true, endereco: novoEndereco });
};
