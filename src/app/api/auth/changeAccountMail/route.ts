import transporter from "../../../../libs/nodemailer.config";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    let subject = "Bienvenido a Packar";
    let content = `    <html>
      <head>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  background-color: #fe1252;
                  padding: 20px;
              }
              h1 {
                  color: #fe1252;
              }
              p {
                  color: #17181c;
              }
          </style>
      </head>
      <body>
          <h1>Bienvenido a Packar</h1>
          <p>¡Hola ${email}, estamos muy contentos de que te sumes a nosotros!</p>
          <p>¡Tu cuenta ha sido actualizada, vamos a ver los siguientes pasos!</p>
          <p>Si cuenta fue aprobada podrás crear viajes con nosotros, de lo contrario deberás volver a enviar la información con los datos correctos.</p>
      </body>
  </html>`;

    const mailOptions = {
      from: process.env.CORREO_GMAIL,
      to: email,
      subject: subject,
      html: content,
    };

    const sendMailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          //console.error('Error sending email:', error);
          reject(error);
        } else {
          //console.log('Email sent:', info.response);
          resolve(info);
        }
      });
    });

    await sendMailPromise;

    //console.log("send");

    return NextResponse.json("message send");
  } catch (error) {
    console.error("Error processing mail request:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
