const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const db = readDB();

    const cliente = db.clientes.find(c => c.email === email && c.senha === senha);
    if (cliente) {
      return res.json({
        tipo: 'cliente',
        usuario: { id: cliente.id, email: cliente.email, nome: cliente.nome }
      });
    }

    const fornecedor = db.farmacias.find(f => f.email === email && f.senha === senha);
    if (fornecedor) {
      return res.json({
        tipo: 'fornecedor',
        usuario: { id: fornecedor.id, email: fornecedor.email, nome: fornecedor.nome }
      });
    }

    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao processar login.' });
  }
};
