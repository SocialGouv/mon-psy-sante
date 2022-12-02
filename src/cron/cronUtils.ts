import nodemailer, { SendMailOptions } from "nodemailer";

import config from "../services/config";

export async function sendEmailWithAttachments({
  subject,
  textSlices,
  attachments,
}: {
  subject: string;
  textSlices: string[];
  attachments: {
    filename: string;
    content: string | Buffer;
  }[];
}) {
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

  const mail: SendMailOptions = {
    from: `MonParcoursPsy <${config.supportMail}>`,
    html: textSlices.join("<br />"),
    subject: subject,
    text: textSlices.join("\n"),
    to: config.reportingMailRecipients,
    attachments,
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
