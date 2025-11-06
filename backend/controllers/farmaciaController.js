const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

function readDB() {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
  const db = readDB();
  res.json(db.farmacias);
};

exports.getById = (req, res) => {
  const db = readDB();
  const farmacia = db.farmacias.find(f => f.id === parseInt(req.params.id));
  if (!farmacia) return res.status(404).json({ message: 'Farmácia não encontrada' });
  res.json(farmacia);
};

exports.create = (req, res) => {
  const db = readDB();
  const nova = req.body;
  nova.id = db.farmacias.length ? db.farmacias[db.farmacias.length - 1].id + 1 : 1;
  db.farmacias.push(nova);
  writeDB(db);
  res.status(201).json(nova);
};

exports.update = (req, res) => {
  const db = readDB();
  const index = db.farmacias.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Farmácia não encontrada' });
  db.farmacias[index] = { ...db.farmacias[index], ...req.body };
  writeDB(db);
  res.json(db.farmacias[index]);
};

exports.remove = (req, res) => {
  const db = readDB();
  const index = db.farmacias.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Farmácia não encontrada' });
  db.farmacias.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Farmácia excluída.' });
};
