const express = require('express');
const router = express.Router();
const { createCheckoutSession, verifyCheckoutSession } = require('../controllers/stripeSheckOutController');

router.post('/create-checkout-session', createCheckoutSession);

router.post('/verify-checkout-session', verifyCheckoutSession);

module.exports = router;