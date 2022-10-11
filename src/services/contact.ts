import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

import config from "./config";

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

export const sendMail = (to: string, subject: string, html: string) => {
  const sanitizedHTML = sanitizeHtml(html);
  const mail = {
    from: `ParcoursPsy <${config.supportMail}>`,
    html: sanitizedHTML,
    subject,
    text: sanitizedHTML,
    to,
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
};
