"use server"

import { sendEmail } from "./send-email"

export async function submitContact(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const { name, email, subject, message } = data

  if (!name || !email || !message) {
    return { success: false, message: "Missing required fields." }
  }

  try {
    const emailResult = await sendEmail({
      to: "atom.print05@gmail.com", // Original intended recipient (for reference only)
      replyTo: email, // Set reply-to as the form submitter's email
      subject: `New Contact: ${subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    })

    if (!emailResult.success) {
      return { success: false, message: emailResult.message || "Failed to send message. Please try again." }
    }

    return { success: true, message: "Message sent successfully." }
  } catch (error) {
    console.error("Email send failed:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}
