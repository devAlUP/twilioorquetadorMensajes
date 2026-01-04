require('dotenv').config();
//importacion de express
const express = require('express');
//importar twilio 
const twilio = require('twilio');
//Inicializar la aplicación Express
const app = express();
//importacion cors
const cors = require('cors');
//puerto
const PORT = 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;

app.use(cors({ origin: '*' })); // Reemplaza con el puerto de tu app Vue
app.use(express.json());

// ⚠️ Endpoint para enviar el mensaje de WhatsApp ⚠️
app.post('/send-whatsapp', async (req, res) => {
  const { Numero,Escuela,Fecha,Horario,Link,Limite,Nombre } = req.body;

  


  const variables = {
    // Para {{1}}
    1: Escuela, 
    // Para {{2}}
    2: Fecha,
    // Para {{3}}
    3: Horario,
    4:Link,
    5:Limite,
    6:Nombre
};
console.log(variables,Numero)
  // Validación básica
  //if (!recipient || !imageUrl) {
    //return res.status(400).send({ success: false, message: 'Faltan el destinatario o la URL de la imagen.' });
  //}

  // Inicializa el cliente de Twilio
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      // El número de WhatsApp del destinatario (ej. whatsapp:+521234567890)
       from: twilioNumber,
        contentSid: 'HX8327aa7c7108e5ab0021005370f69b6d',
        contentVariables: JSON.stringify(variables),
        to: Numero
    });

    console.log('Mensaje enviado con SID:', message.sid);
    res.send({ success: true, message: 'Mensaje de WhatsApp enviado exitosamente.', sid: message.sid,variables,Numero });

  } catch (error) {
    console.error('Error al enviar WhatsApp:', error);
    res.status(500).send({ success: false, message:  error });
  }
});
/*app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en http://localhost:${PORT}`);
});*/
module.exports=app



