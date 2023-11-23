import { transporter } from "../configs/nodemailer";

export default {
  async emailRecoveryPass(userEmail: string, token: string) {
    const mailOptions = {
      from: "Teste <nalberthcastro1510@hotmail.com>",
      to: userEmail,
      subject: "Recuperação de senha",
      html: `
      <p>Esqueceu sua senha? Não tem problema, você pode redefi-la usando o token abaixo: </p>

      <p>${token}</p>`,
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }

      console.log("Email sent");
    });
  },
};
