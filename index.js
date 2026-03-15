require('dotenv').config();
//importacion de express
const express = require('express');
//Inicializar la aplicación Express
const app = express();
//importacion cors
const cors = require('cors');
//puerto
const PORT = 3000;
const rutasMensajeria = require('./routes/Mensajeria/mensajeria')


app.use(cors({ origin: '*' })); // Reemplaza con el puerto de tu app Vue
app.use(express.json());
//usar Rutas
app.use('Escuelas/',rutasMensajeria)


 

  
/*app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${PORT}`);
});*/
module.exports=app



