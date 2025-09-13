const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// 🔐 Configuration eBay
const verificationToken = "jesuisunverificationtokenpourebay"; // entre 32 et 80 caractères
const endpointURL = "https://ebay-notify-endpoint.onrender.com/ebay-notify"; // ton URL exacte

// ✅ 1. Route GET pour validation eBay (avec challenge_code)
app.get('/ebay-notify', (req, res) => {
  const challengeCode = req.query.challenge_code;

  console.log('👉 Requête GET reçue de eBay :', req.originalUrl);
  console.log('🧪 challengeCode =', challengeCode);

  if (!challengeCode) {
    return res.status(400).json({ error: "Missing challenge_code" });
  }

  // Hash = SHA256(challengeCode + verificationToken + endpointURL)
  const dataToHash = challengeCode + verificationToken + endpointURL;
  const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

  console.log('✅ challengeResponse =', hash);

  res.status(200).json({ challengeResponse: hash });
});

// 📩 2. Route POST pour recevoir les vraies notifications
app.post('/ebay-notify', (req, res) => {
  console.log('✅ Notification eBay reçue :', req.body);
  res.status(200).json({ message: 'Notification reçue avec succès' });
});

// 🧪 3. Route test navigateur
app.get('/', (req, res) => {
  res.send('🔧 Serveur eBay Notify opérationnel');
});

// 🚀 4. Lancement du serveur
const PORT = process.env.PORT || 3000;
console.log("🔌 Valeur de process.env.PORT :", process.env.PORT);
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
