const express = require('express');
const cors = require('cors');
const path = require('path');


const farmaciaRoutes = require('./routes/farmacias');
const produtoRoutes = require('./routes/produtos');
const cadastroRoutes = require('./routes/cadastro');
const loginRoutes = require('./routes/login');
const clienteRoutes = require('./routes/clientes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/media', express.static(path.join(__dirname, './media')));

app.use('/farmacias', farmaciaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/clientes', clienteRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));