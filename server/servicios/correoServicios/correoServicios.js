const nodemailer = require('nodemailer');

// Configurar el transporte con los datos de servidor de correo
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'oraculoNotifica@gmail.com',
        pass: 'prns cwjd omgt xmrd'
    }
});

const enviarCorreo = async (plantillaHTML, datos, direccion, asunto) => {
    try {
        var plantilla = plantillaHTML(datos);

        // Configurar el correo
        const mailOptions = {
            from: 'oraculoNotifica@gmail.com',
            to: direccion,
            subject: asunto,
            html: plantilla
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
    }
}

module.exports = {
    enviarCorreo,
};