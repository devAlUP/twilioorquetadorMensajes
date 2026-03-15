//importar twilio 
const twilio = require('twilio');


//configuraciones twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER;
 const client = twilio(accountSid, authToken);

 //funcion
 exports.sendWhatsapp = async (req, res) => {
    const { Numero,Escuela,Fecha,Horario,Link,Limite,Nombre } = req.body;
     const variables = {
  
    1: Escuela, 
    2: Fecha,
    3: Horario,
    4:Link,
    5:Limite,
    6:Nombre
    };
console.log(variables);

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

  } 
  catch (error) {
    console.error('Error al enviar WhatsApp:', error);
    res.status(500).send({ success: false, message:  error });
  }
}
