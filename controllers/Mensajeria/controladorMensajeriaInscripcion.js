//importar twilio 
const twilio = require('twilio');


//configuraciones twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

 //funcion
 exports.sendSms = async (req, res) => {
    const { Numero, Escuela, Fecha, Horario, Link, Limite, Nombre } = req.body;
    
    // Formateo del número (asegurar formato E.164)
    let numeroFormateado = Numero.includes('+521') ? Numero.replace('+521', '+52') : Numero;
    
    // Crear el mensaje de texto plano (reemplazando tus variables)
    const bodyMessage =`Bendiciones! ${Nombre}
Tenemos en nuestro registro que te inscribiste a "${Escuela}" y este mensaje es para recordarte que el domingo ${Fecha} comienzan las clases.

Como información importante, las clases se impartirán cada domingo de ${Horario} por los próximos 3 meses culminando con un retiro y envío.

Nada de esto tiene costo, el único requisito para poder tomar el retiro y poder pasar al siguiente nivel es tener cursado como mínimo el 75% del curso (máximo 3 faltas).

La asistencia se toma en la puerta con 15 minutos de tolerancia. Descarga tu QR de asistencia aquí: ${Link}

Si llegas después de las ${Horario}, sí puedes entrar, pero no se marcará asistencia. Recuerda traer Biblia, cuaderno y pluma.

Dudas: whatsapp 55 4994 8105`;

    try {
        const message = await client.messages.create({
            body: bodyMessage,           // Aquí va el texto plano
            from: process.env.TWILIO_PHONE_NUMBER, // Tu número de Active Numbers (con +52...)
            to: numeroFormateado
        });

        console.log('SMS enviado con SID:', message.sid);
        res.send({ success: true, message: 'SMS enviado exitosamente.', sid: message.sid });

    } catch (error) {
        console.error('Error al enviar SMS:', error);
        res.status(500).send({ success: false, message: error.message });
    }
}
