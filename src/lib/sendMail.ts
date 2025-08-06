import { Session } from '@auth/qwik';
import { server$ } from '@qwik.dev/router';
import nodemailer from 'nodemailer';
// import { PrismaClient } from "@prisma/client";
import { prisma } from '~/lib/prisma.server';
// import { prisma } from "~/lib/prismaClient";


export const serverSendEmail = server$( 
  async function ( 
    mailOpt: nodemailer.SendMailOptions,
    application: string = "app",
    pid : number = 0
  )  
{
  // Configura il trasportatore SMTP senza autenticazione
  const transporter = nodemailer.createTransport({
    host:  this.env.get('SMTP_HOST') ,
    port: 25,  
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    name: this.env.get('HOST_NAME') ,
  });

  console.log("send email", mailOpt.to, mailOpt.cc, mailOpt.subject) 
  const mailOptions = {
    from: 'no-reply@meteo.fvg.it', 
    ...mailOpt
  };

  // get session User
  const session: Session = this.sharedMap.get("session");
  const userId = session.user.id || 0;


  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email inviata: ', info.messageId);
    await prisma.email.create({ 
      data: { 
        datetime: new Date() , 
        application: application , 
        recipient: mailOpt.to?.toString() || "", 
        subject: mailOpt.subject?.toString() || "", 
        response: info.response.toString() as string,
        userId: +userId,
        productId: pid
      } });  
    return {  ...info, status: true, message: "email inviata con successo" } 
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return { error: true, status: false, message: error as string }
    // const err = error as Error
    // await prisma.email.create({ 
    //   data: { 
    //     datetime: new Date() , 
    //     application: application , 
    //     recipient: mailOpt.to?.toString() || "", 
    //     subject: mailOpt.subject?.toString() || "", 
    //     response: err.toString() as string,
    //     userId: +userId 
    //   } });  
    // throw new Error(error as string) 
  } 
});