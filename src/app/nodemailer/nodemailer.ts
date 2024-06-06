import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verificationType } from "../enums/verification";
import bcryptjs from "bcryptjs";
import User from "../model/UserModel";
function emailFormat(
  header: String,
  subheader: String,
  route: String,
  buttonText: String,
  token: String
): string {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
              border-radius: 10px;
          }
          .header {
           
              color: #ffffff;
              padding: 10px 0;
     
              border-radius: 10px 10px 0 0;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
          }
          .content {
              padding: 20px;
          }
          .content p {
              color: #666666;
              line-height: 1.6;
              font-size:1.2rem;
            }
            .button {
              font-size:1.3rem;
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              color: white;
              background-color: #28a745;
              text-decoration: none;
              border-radius: 5px;
          }
          .footer {
              text-align: center;
              padding: 10px;
              color: #999999;
              font-size: 14px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>${header}</h1>
          </div>
          <div class="content">
              <p>${subheader}</p>
              <a href="${
                process.env.HOSTED_DOMAIN
                // process.env.LOCAL_DOMAIN
              }/${route}/${token}" class="button">${buttonText}</a>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Query. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
}
export async function sendEmailVerification({ email, id, emailType }: any) {
  try {
    const token = await bcryptjs.hash(id.toString(), 10);
    // token is creatin g asdf/asdf/asdf so its taking to another route
    const encodedToken = encodeURIComponent(token);
    // add this token to user in database accordint to email type
    if (emailType == verificationType.emailVerification) {
      await User.findOneAndUpdate(
        { email },
        {
          verifyToken: encodedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    }
    // create email content
    const emailContent =
      emailType === verificationType.emailVerification
        ? emailFormat(
            "Thank you for signing up for Query.",
            "Click the link below to verify your email.",
            "verifyemail",
            "Verify Email",
            encodedToken
          )
        : emailFormat(
            "You recently requested to reset your password.",
            "Click the link below to reset your password.",
            "resetpassword",
            "Reset Password",
            encodedToken
          );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.GMAIL_EMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    const options = {
      // from: process.env.GMAIL_EMAIL_ADDRESS, // sender address
      from: "query@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType == verificationType.emailVerification
          ? "Email Verification Confimation"
          : "Forget Password Verification Confirmation", // Subject line
      // plain text body
      html: emailContent, // html body
    };
    const info = transporter.sendMail(options);
    console.log("sent");

    return info;
  } catch (error) {
    return console.log("error", error);
  }
}
