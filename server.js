const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

const app = express();
const port = process.env.PORT || 3000;
const rootDir = path.join(__dirname);
const uploadDir = path.join(rootDir, 'uploads');
const submissionsFile = path.join(rootDir, 'submissions.json');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

app.use(express.static(rootDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/confirm', upload.single('proof'), (req, res) => {
  try {
    const { name, email, phone, currency, amount, method, message } = req.body;
    if (!name || !email || !amount || !method) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir les champs requis.' });
    }

    const proof = req.file ? req.file.filename : null;
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      currency,
      amount,
      method,
      message,
      proof
    };

    const submissions = fs.existsSync(submissionsFile)
      ? JSON.parse(fs.readFileSync(submissionsFile, 'utf8'))
      : [];

    submissions.push(entry);
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');

    res.json({ success: true, message: 'Merci ! Votre confirmation a bien été reçue.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY || '';
    if (!stripeKey || stripeKey.includes('sk_test_...')) {
      return res.status(500).json({ error: 'Stripe n est pas configuré. Ajoutez votre clé secrète Stripe dans les variables d\'environnement.' });
    }

    const { amount, currency, method } = req.body;
    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount <= 0) { 
      return res.status(400).json({ error: 'Montant invalide.' });
    }

    const currencyKey = String(currency || 'USD').toUpperCase();
    const conversionRates = { HTG: 150 };
    const chargeCurrency = currencyKey === 'HTG' ? 'usd' : currencyKey.toLowerCase();
    const chargeAmount = currencyKey === 'HTG'
      ? Math.max(1, Math.ceil(parsedAmount / conversionRates.HTG)) * 100
      : Math.round(parsedAmount * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: chargeCurrency,
          product_data: {
            name: 'Don à Haitians Helping Haiti',
            description: `Méthode: ${method} - Montant ${parsedAmount} ${currencyKey}`,
          },
          unit_amount: chargeAmount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/confirmation.html?success=true`,
      cancel_url: `${req.protocol}://${req.get('host')}/#don`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la session de paiement.' });
  }
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email requis.' });
  }
  // Ici, intégrer Mailchimp ou autre service
  console.log(`Nouvel abonnement: ${email}`);
  res.json({ success: true, message: 'Merci pour votre abonnement !' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
