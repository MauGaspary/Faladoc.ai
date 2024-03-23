const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Atençáo chegou o chatuba');
});

app.listen(port, () => {
  console.log(`Aplicativo ouvindo na porta ${port}`);
});
