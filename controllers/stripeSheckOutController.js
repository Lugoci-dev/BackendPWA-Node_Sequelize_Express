const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Tu clave secreta


const createCheckoutSession = async (req, res) => {
  const { currency, products } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map(product => ({
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
          },
          unit_amount: product.amount,
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:9000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:9000/cancel',
    });

    res.status(200).json({ id: session.id });
    // res.status(200).json({...session});

  } catch (error) {
    console.error('Error al crear Checkout Session:', error);
    res.status(500).json({ error: error.message });
  }
};

const verifyCheckoutSession = async (req, res) => {
const { sessionId, expectedTotal, currency } = req.body;

try {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ['payment_intent'],
});

// Validaciones
if (session.payment_status !== 'paid') {
  return res.status(400).json({ error: 'El pago no se ha completado' });
}
// if (session.currency !== currency) {
//   return res.status(400).json({ error: 'Moneda incorrecta' });
// }
// res.status(200).jsoSn({...session});

res.status(200).json({
  status: 'success',
  sessionId: session.id,
  amount: session.amount_total / 100,
  currency: session.currency,
  paymentIntentId: session.payment_intent.id,
});

} catch (error) {
console.error('Error al verificar Checkout Session:', error);
res.status(500).json({ error: error.message });
}
};

module.exports = { createCheckoutSession, verifyCheckoutSession };


// const createCheckoutSession = async (req, res) => {
//   const { amount } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'], // Métodos de pago (tarjetas por ahora)
//       line_items: [
//         {
//           price_data: {
//             currency: 'eur',
//             product_data: {
//               name: 'Compra en MiTienda', // Nombre del producto
//             },
//             unit_amount: amount, // Monto en centavos (ej. 1000 = 10.00 EUR)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment', // Pago único (no suscripción)
//       success_url: 'http://localhost:9000/success?session_id={CHECKOUT_SESSION_ID}', // URL de éxito
//       cancel_url: 'http://localhost:9000/cancel', // URL de cancelación
//     });
    
//     // res.status(200).json({ id: session.id });
//     res.status(200).json(session);
//   } catch (error) {
//     console.error('Error al crear Checkout Session:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Nuevo controlador para verificar la sesión
// const verifyCheckoutSession = async (req, res) => {
//   const { sessionId } = req.body;

//   try {
//     // Consultar la sesión en Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     // Opcional: Verificar el estado del pago
//     if (session.payment_status === 'paid') {
//       res.status(200).json({
//         status: 'success',
//         amount: session.amount_total / 100, // Convertir centavos a euros
//         currency: session.currency,
//         customer_email: session.customer_details?.email || 'No proporcionado',
//       });
//     } else {
//       res.status(400).json({ status: 'error', message: 'El pago no se ha completado' });
//     }
//   } catch (error) {
//     console.error('Error al verificar Checkout Session:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { createCheckoutSession, verifyCheckoutSession };