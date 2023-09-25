const express = require('express');
const router = express.Router();

const politicasRoutes = require('./politicasRoutes')

router.use('/politicas', politicasRoutes);

module.exports = router;
