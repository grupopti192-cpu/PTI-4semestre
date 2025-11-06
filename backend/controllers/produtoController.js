const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

exports.getProdutos = (req, res) => {
  const farmaciaId = parseInt(req.query.farmaciaId);
  const db = readDB();

  if (!farmaciaId) {
    return res.json(db.produtos);
  }

  const farmacia = db.farmacias.find(f => f.id === farmaciaId);
  if (!farmacia) {
    return res.status(404).json({ mensagem: "Farmácia não encontrada." });
  }

  const produtos = db.produtos.filter(p => farmacia.produtos.includes(p.id));

  res.json(produtos);
};
