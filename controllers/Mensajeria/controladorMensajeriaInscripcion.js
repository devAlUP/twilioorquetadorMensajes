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
  
    1: Nombre, 
    2: Escuela,
    3: Fecha,
    4:Horario,
    5:Link,
    6:Limite
    };
console.log(variables);

    try {
        const message = await client.messages.create({
      
            from: twilioNumber,
            contentSid: 'HXab56604852682b09420d58b08fb81ed6',
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
