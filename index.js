require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// 1. Configuración de CORS base
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 2. HEADERS MANUALES (Debe ir ANTES de las rutas)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// 3. Middlewares de Body
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 4. Importación y Uso de Rutas
const rutasMensajeria = require('./routes/Mensajeria/mensajeria');
const rutasDocumentos = require('./routes/CreadorDocumentos/Documentos');

app.use('/Escuelas', rutasMensajeria);
app.use('/Escuelas', rutasDocumentos);

module.exports = app;