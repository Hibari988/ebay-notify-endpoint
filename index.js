const express = require('express');
const app = express();

app.use(express.json());

// 🔔 eBay t’enverra une notification ici
app.post('/ebay-notify', (req, res) => {
  console.log('✅ Notification eBay reçue :', req.body);
  res.sendStatus(200); // eBay veut juste un "200 OK"
});

// 🔍 Page test si tu ouvres l’URL dans un navigateur
app.get('/', (req, res) => {
  res.send('🔧 Serveur eBay Notify opérationnel');
});

// 🚀 Lance le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
