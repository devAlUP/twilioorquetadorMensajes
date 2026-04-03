require('dotenv').config();
//importacion de express
const express = require('express');
//Inicializar la aplicación Express
const app = express();
//importacion cors
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//puerto
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const PORT = 3000;
const rutasMensajeria = require('./routes/Mensajeria/mensajeria')
const rutasDocumentos = require('./routes/CreadorDocumentos/Documentos')



app.use(express.json());
//usar Rutas
app.use('/Escuelas',rutasMensajeria)
app.use('/Escuelas',rutasDocumentos)


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: "JSON mal formado" });
  }
  next();
});

 

  
/*app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${PORT}`);
});*/
module.exports=app



