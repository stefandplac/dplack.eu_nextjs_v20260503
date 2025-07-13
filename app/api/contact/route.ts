import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'stefandplac@gmail.com',
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F75BC;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service of Interest:</strong> ${service || 'Not specified'}</p>
          </div>
          <div style="background-color: #e9ecef; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
            <p style="margin: 0; color: #155724;">
              <strong>Submitted:</strong> ${new Date().toLocaleString('es-ES', {
                timeZone: 'Europe/Madrid',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for contacting D-PLACK CONSTRUCT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0F75BC; margin-bottom: 10px;">D-PLACK CONSTRUCT</h1>
            <p style="color: #666; margin: 0;">Construcción y Rehabilitación</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px;">
            <h2 style="color: #333; margin-top: 0;">Thank you for contacting us!</h2>
            <p style="color: #555; line-height: 1.6;">
              Dear ${name},
            </p>
            <p style="color: #555; line-height: 1.6;">
              We have received your message and will get back to you as soon as possible. 
              Our team typically responds within 24 hours during business days.
            </p>
            <p style="color: #555; line-height: 1.6;">
              <strong>Your message details:</strong><br>
              Service: ${service || 'Not specified'}<br>
              Message: ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}
            </p>
            <p style="color: #555; line-height: 1.6;">
              If you have any urgent questions, please don't hesitate to call us at:
              <br><strong style="color: #0F75BC;">(0034)-647-857-388</strong>
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Our Services</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Construcción y Demolición</li>
              <li>Pintura y Acabados</li>
              <li>Pavimentos</li>
              <li>Aislamiento</li>
              <li>Instalaciones Eléctricas</li>
              <li>Instalaciones Térmicas</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
            <p>D-PLACK CONSTRUCT<br>
            Tel: (0034)-647-857-388<br>
            Email: info@dplack.eu</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! We will contact you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'There was an error sending the message. Please try again.' 
      },
      { status: 500 }
    );
  }
} 