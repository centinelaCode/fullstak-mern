import nodemailer from 'nodemailer';

const emailOlvidePassword = async(data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const {nombre, email, token} = data;
  
  // TODO: Enviar el email
  const info = await transporter.sendMail({
    from: 'APV - Administrador de PAcientes de Veterinaria',
    to: email,
    subject: 'Restablece tu Password',
    text: 'Restablece tu Password',
    html: `<p>Hola ${nombre}, has solicitado restablececer tu password</p>

           <p>Haz clic en el siguiente enlace para generar un nuevo password:
           <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a></p>

           <p>Si tu no creaste una cuenta en APV puedes ignoirar este mensaje.</p>    
    `,
  });

  console.log('Mensaje enviado: %s', info.messageId);

}


export default emailOlvidePassword;