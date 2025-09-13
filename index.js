const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 🔐 Configuration eBay
const verificationToken = "jesuisunverificationtokenpourebay"; // 32 à 80 caractères
const endpointURL = "https://ebay-notify-endpoint.onrender.com/ebay-notify"; // ton URL exacte

// ✅ 1. Route GET : validation du challenge_code eBay
app.get('/ebay-notify', (req, res) => {
  const challengeCode = req.query.challenge_code;

  console.log('👉 Requête GET reçue de eBay :', req.originalUrl);
  console.log('🧪 challengeCode =', challengeCode);

  if (!challengeCode) {
    return res.status(400).json({ error: "Missing challenge_code" });
  }

  const dataToHash = challengeCode + verificationToken + endpointURL;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  console.log('✅ challengeResponse =', hash);

  // 🔧 Forcer Content-Type pour eBay
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ challengeResponse: hash }));
});

// 📩 2. Route POST : réception des notifications eBay
app.post('/ebay-notify', (req, res) => {
  console.log('✅ Notification eBay reçue :', req.body);
  res.status(200).json({ message: 'Notification reçue avec succès' });
});

// 🧪 3. Page d’accueil : test manuel
app.get('/', (req, res) => {
  res.send('🔧 Serveur eBay Notify opérationnel');
});

// 🚀 4. Lancement du serveur
const PORT = process.env.PORT || 3000;
console.log("🔌 Valeur de process.env.PORT :", process.env.PORT);
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
