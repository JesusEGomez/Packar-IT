import transporter from '../../../../libs/nodemailer.config';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const data = await request.json();
      console.log(data);
      
  
      let subject = 'Nueva cuenta connect';
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
          <h1>Hola, ${data.name} ha solicitado crear una cuenta de stripe connect </h1>
            <p>  country: ${data.countries},</p>
            <p>  bank: ${data.bank},</p>
            <p>  name: ${data.name},</p>
            <p>  lastName: ${data.lastName},</p>
            <p>  phone: ${data.phone},</p>
            <p>  address: ${data.address},</p>
            <p>  city: ${data.city},</p>
            <p>  zipCode: ${data.zipCode},</p>
            <p>  dd: ${data.dd},</p>
            <p>  mm: ${data.mm},</p>
            <p>  aaaa: ${data.aaaa},</p>
            <p>  accountNumber: ${data.accountNumber},</p>
            <p>  userId: ${data.userId},</p>
            <p>  email: ${data.email},</p>
            <p>  idDoc: ${data.idDoc}</p>
      </body>
      </html>`;   
  
      const mailOptions = {
        from: process.env.CORREO_GMAIL,
        to: 'cleivaj93@gmail.com',
        subject: subject,
        html: content,
      };
  
      const sendMailPromise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject(error);
          } else {
            console.log('Email sent:', info.response);
            resolve(info);
          }
        });
      });
  
      await sendMailPromise;
  
      console.log("send");
  
      return NextResponse.json("message send");
    } catch (error) {
      console.error('Error processing mail request:', error);
      return NextResponse.json({ message: 'Internal server error' });
    }
  }
  