const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, '../data/db.json');

function readDB(){ return JSON.parse(fs.readFileSync(dbPath,'utf8')); }
function writeDB(db){ fs.writeFileSync(dbPath, JSON.stringify(db,null,2)); }

router.put('/:id', (req, res) => {
  try {
    const db = readDB();
    const id = parseInt(req.params.id,10);
    const cliente = db.clientes.find(c => c.id === id);
    if (!cliente) return res.status(404).json({ sucesso:false, mensagem:'Cliente não encontrado' });

    const { nome, email, telefone, endereco } = req.body;
    if (nome !== undefined) cliente.nome = nome;
    if (email !== undefined) cliente.email = email;
    if (telefone !== undefined) cliente.telefone = telefone;
    if (endereco !== undefined) cliente.endereco = endereco;

    writeDB(db);
    return res.json({ sucesso:true, cliente });
  } catch (err) {
    console.error('Erro PUT /clientes/:id', err);
    res.status(500).json({ sucesso:false, mensagem:'Erro interno' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const db = readDB();
    const id = parseInt(req.params.id, 10);
    const cliente = db.clientes.find(c => c.id === id);
    if (!cliente) {
      return res.status(404).json({ sucesso: false, mensagem: 'Cliente não encontrado' });
    }
    return res.json(cliente);
  } catch (err) {
    console.error('Erro GET /clientes/:id', err);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno' });
  }
});


module.exports = router;
