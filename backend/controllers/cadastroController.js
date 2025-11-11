const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../data/db.json");

function readDB() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
}

function gerarId(lista) {
  return lista.length > 0 ? lista[lista.length - 1].id + 1 : 1;
}

exports.cadastrarCliente = (req, res) => {
  const { email, senha, nome, cpf, telefone, endereco } = req.body;

  if (!email || !senha || !nome || !cpf || !telefone || !endereco) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const db = readDB();

  if (db.clientes.find(c => c.email === email)) {
    return res.status(400).json({ erro: "E-mail já cadastrado." });
  }

  const novoCliente = {
    id: gerarId(db.clientes),
    email,
    senha,
    nome,
    cpf,
    telefone,
    endereco,
    fotoPerfil: "./media/placeholder_user.png"
  };

  db.clientes.push(novoCliente);
  writeDB(db);

  res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
};

exports.atualizarCliente = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, telefone, endereco } = req.body;
  const db = readDB();

  const cliente = db.clientes.find(c => c.id === id);
  if (!cliente) return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado.' });

  if (nome) cliente.nome = nome;
  if (email) cliente.email = email;
  if (telefone) cliente.telefone = telefone;
  if (endereco) cliente.endereco = endereco;

  writeDB(db);
  res.json({ sucesso: true, cliente });
};


exports.cadastrarFarmacia = (req, res) => {
  const { email, senha, nome, cnpj, telefone, endereco } = req.body;

  if (!email || !senha || !nome || !cnpj || !telefone || !endereco) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const db = readDB();

  if (db.farmacias.find(f => f.email === email)) {
    return res.status(400).json({ erro: "E-mail já cadastrado." });
  }

  const novaFarmacia = {
    id: gerarId(db.farmacias),
    email,
    senha,
    nome,
    cnpj,
    telefone,
    endereco,
    fotoPerfil: "./media/placeholder_farmacia.png",
    avaliacao: "",
    taxa: "",
    tempoEntrega: "",
    status: "",
    produtos: []
  };

  db.farmacias.push(novaFarmacia);
  writeDB(db);

  res.status(201).json({ mensagem: "Farmácia cadastrada com sucesso!" });
};
