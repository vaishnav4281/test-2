import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, service } = await request.json()

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    if (!process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Admin email is not configured' },
        { status: 500 }
      )
    }

    // Dynamically import Resend
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: 'Financial Advisor <notifications@yourdomain.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry: ${service}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })

    if (adminEmail.error) {
      return NextResponse.json(
        { error: `Failed to send admin notification: ${adminEmail.error.message}` },
        { status: 500 }
      )
    }

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: 'Financial Advisor <notifications@yourdomain.com>',
      to: email,
      subject: 'Thank you for your inquiry',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry about ${service}. Our team will review your message and get back to you shortly.</p>
        <p>Here's a summary of your inquiry:</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        <p>Best regards,<br>Financial Advisor Team</p>
      `
    })

    if (userEmail.error) {
      return NextResponse.json(
        { error: `Failed to send user confirmation: ${userEmail.error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
} 