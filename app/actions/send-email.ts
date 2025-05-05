"use server"

import { resend } from "./resend"

interface EmailData {
  from?: string
  to?: string // Original intended recipient (for reference only)
  subject: string
  html: string
  replyTo?: string
}

// The verified email that can receive test emails
const VERIFIED_EMAIL = "vikhyatcoder@gmail.com" // This must be your verified email

export async function sendEmail(data: EmailData) {
  const { subject, html, replyTo, to } = data

  // Validate required fields
  if (!subject || !html) {
    return { success: false, message: "Missing required email fields" }
  }

  try {
    // Always send to the verified email in test mode
    const recipient = VERIFIED_EMAIL

    // Include the original intended recipient in the subject if provided
    const enhancedSubject = to ? `${subject} (intended for: ${to})` : subject

    console.log("Sending email to:", recipient)
    console.log("Subject:", enhancedSubject)

    const response = await resend.emails.send({
      from: "Atom Print <onboarding@resend.dev>",
      to: [recipient],
      subject: enhancedSubject,
      html,
      reply_to: replyTo,
    })

    if (response.error) {
      console.error("Resend API error:", response.error)
      return { success: false, message: `Email error: ${response.error.message}` }
    }

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("Email sending failed:", error)

    // Fallback for development/testing
    console.log("Email would be sent:")
    console.log("To:", VERIFIED_EMAIL)
    console.log("Subject:", subject)
    console.log("Content:", html)

    return { success: true, message: "Email logged (development mode)" }
  }
}
