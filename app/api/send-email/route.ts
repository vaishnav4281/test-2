import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, service } = await request.json()

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Email service is not configured')
    }

    if (!process.env.ADMIN_EMAIL) {
      throw new Error('Admin email is not configured')
    }

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
      throw new Error(`Failed to send admin notification: ${adminEmail.error.message}`)
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
        <p>If you have any urgent questions, please feel free to call us at +91 9447218188.</p>
        <p>Best regards,<br>Financial Advisor Team</p>
      `
    })

    if (userEmail.error) {
      throw new Error(`Failed to send user confirmation: ${userEmail.error.message}`)
    }

    return NextResponse.json({ 
      success: true,
      message: 'Emails sent successfully'
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to send email',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
} 