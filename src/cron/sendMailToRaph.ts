import nodemailer from "nodemailer";

import config from "../services/config";

const mailTransport = nodemailer.createTransport({
  auth: {
    pass: config.mail.auth.pass,
    user: config.mail.auth.user,
  },
  host: config.mail.host,
  ignoreTLS: !config.mail.tls,
  port: config.mail.port,
  requireTLS: config.mail.tls,
});

export function sendMailToRaph() {
  const mail = {
    from: `MonPsy <${config.supportMail}>`,
    html: "<b>bonjour</b> raph",
    subject: "salut raph",
    text: "bonjour raph",
    to: "raph@selego.co",
  };
  if (config.mail.enabled) {
    return new Promise((resolve, reject) => {
      mailTransport.sendMail(mail, (error, info) => {
        console.log(error, info);
        return error ? reject(error) : resolve(info);
      });
    });
  }
  console.log("Send email skipped");
  return Promise.resolve();
}
