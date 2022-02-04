const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (mailTo) => {
    try {
        const msg = {
            to: mailTo,
            from: 'snreynoso@gmail.com', // Use the email address verified
            subject: 'Bienvenido a Movie DB',
            text: 'Bienvenido a la base de datos de peliculas!',
            html: '<strong>Bienvenido a la base de datos de peliculas Challenge ALkemy!</strong>',
        };

        await sgMail.send(msg);

    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body)
        }
    }
};

module.exports = sendEmail;