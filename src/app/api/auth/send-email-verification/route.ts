import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Alternative configuration for custom SMTP
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the verification code in your database with expiration
    // For now, we'll use a simple in-memory store (replace with database in production)
    // await storeVerificationCode(email, verificationCode, 'email');

    // Email template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .verification-code { background: #fff; border: 2px solid #f59e0b; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏗️ BuildHub Email Verification</h1>
              <p>Welcome to the UK's leading construction marketplace</p>
            </div>
            <div class="content">
              <h2>Verify Your Email Address</h2>
              <p>Hello! Thank you for signing up with BuildHub. To complete your registration and start connecting with verified construction professionals, please verify your email address.</p>
              
              <div class="verification-code">
                <p><strong>Your Verification Code:</strong></p>
                <div class="code">${verificationCode}</div>
              </div>
              
              <p><strong>This code will expire in 10 minutes for security reasons.</strong></p>
              
              <p>If you didn't request this verification, please ignore this email.</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <h3>Why verify your email?</h3>
              <ul>
                <li>✅ Secure your account</li>
                <li>✅ Receive important project updates</li>
                <li>✅ Get matched with verified professionals</li>
                <li>✅ Access exclusive construction deals</li>
              </ul>
            </div>
            <div class="footer">
              <p>© 2026 BuildHub | UK's Leading Construction Marketplace</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email
    const mailOptions = {
      from: {
        name: 'BuildHub Verification',
        address: process.env.EMAIL_USER || 'noreply@buildhub.co.uk'
      },
      to: email,
      subject: '🏗️ BuildHub - Verify Your Email Address',
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Email verification sent to: ${email}`);
    console.log(`🔑 Verification code: ${verificationCode}`);

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      // Don't send the code to the client in production
      verificationCode: verificationCode // Remove this in production
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    );
  }
}