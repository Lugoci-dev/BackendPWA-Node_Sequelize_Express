const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Reemplaza con tu clave secreta

// Controlador para crear un PaymentIntent
const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Validación básica
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Faltan amount o currency' });
    }

    // Crea el PaymentIntent con Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // ej. 1000 para 10.00 EUR
      currency: currency, // ej. 'eur'
      payment_method_types: ['card'],
      description: 'Compra en MiTienda', // Opcional
    });

    // Responde con el client_secret
    res.status(200).json({ clientSecret: paymentIntent.client_secret, firstStatus: paymentIntent.status });
  } catch (error) {
    console.error('Error al crear PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent };