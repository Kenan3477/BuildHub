import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate UK phone number format
    const ukPhoneRegex = /^(\+44|0)[0-9]{10}$/;
    if (!ukPhoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid UK phone number format' },
        { status: 400 }
      );
    }

    // Format phone number for international use
    let formattedPhone = phoneNumber;
    if (phoneNumber.startsWith('0')) {
      formattedPhone = '+44' + phoneNumber.slice(1);
    }

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the verification code in your database with expiration
    // For now, we'll use a simple in-memory store (replace with database in production)
    // await storeVerificationCode(phoneNumber, verificationCode, 'sms');

    // SMS message template
    const message = `🏗️ BuildHub Verification

Your verification code is: ${verificationCode}

This code expires in 10 minutes.

Welcome to the UK's leading construction marketplace!

Reply STOP to opt out.`;

    // Send SMS via Twilio
    const smsResult = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: formattedPhone,
    });

    console.log(`✅ SMS verification sent to: ${formattedPhone}`);
    console.log(`🔑 Verification code: ${verificationCode}`);
    console.log(`📱 Twilio SID: ${smsResult.sid}`);

    return NextResponse.json({
      success: true,
      message: 'Verification SMS sent successfully',
      // Don't send the code to the client in production
      verificationCode: verificationCode, // Remove this in production
      twilioSid: smsResult.sid
    });

  } catch (error: any) {
    console.error('SMS sending error:', error);
    
    // Handle specific Twilio errors
    if (error.code) {
      return NextResponse.json(
        { 
          error: `SMS sending failed: ${error.message}`,
          code: error.code 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send verification SMS' },
      { status: 500 }
    );
  }
}