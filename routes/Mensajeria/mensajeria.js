const express = require('express');
const router = express.Router();
const controladorInscripcion = require('../../controllers/Mensajeria/controladorMensajeriaInscripcion')


// Definimos la ruta relativa
router.post('/send-whatsapp', controladorInscripcion.sendWhatsapp);

module.exports = router;
