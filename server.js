const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { checkSiteStatus } = require('./pingSites');

const app = express();

// Configurar o middleware para lidar com solicitações POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'urls.html'));
});

// Rota para lidar com consultas de sites
app.post('/consultar-sites', async (req, res) => {
  try {
    const websites = req.body.websites;
    const table = [];
    for (const website of websites) {
      const result = await checkSiteStatus(website);
      if (result && result.site && result.status) {
        table.push(result);
      } else {
        console.error(`Erro ao processar o site ${website}`);
      }
    }
    res.json({ success: true, table });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao processar a solicitação.' });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado na porta ${port}`);
});
