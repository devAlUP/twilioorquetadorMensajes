const express = require('express');
const router = express.Router();
const PdfRetiro = require('../../controllers/CreadorDocumentos/controladorCreadoPDFResponsivaRetiros')


// Definimos la ruta relativa
router.post('/documentos/RetirosPDF', PdfRetiro.generarResponsivaController);

module.exports = router;
