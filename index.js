const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 🔐 Configuration
const verificationToken = "jesuisunverificationtokenpourebay";
const endpointURL = "https://ebay-notify-endpoint.onrender.com/ebay-notify";

// ✅ 1. Route GET pour valider le challenge d'eBay
app.get('/ebay-notify', (req, res) => {
  const challengeCode = req.query.challenge_code;

  if (!challengeCode) {
    return res.status(400).json({ error: "Missing challenge_code" });
  }

  const dataToHash = challengeCode + verificationToken + endpointURL;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  res.status(200).json({ challengeResponse: hash });
});

// 📩 2. Route POST pour recevoir les vraies notifications
app.post('/ebay-notify', (req, res) => {
  console.log('✅ Notification eBay reçue :', req.body);
  res.status(200).json({ message: 'ok' });
});

// 🧪 3. Page d’accueil pour vérifier que le serveur tourne
app.get('/', (req, res) => {
  res.send('🔧 Serveur eBay Notify opérationnel');
});

// 🚀 4. Démarrage du serveur
const PORT = process.env.PORT || 3000;
console.log("Valeur de process.env.PORT :", process.env.PORT);
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
