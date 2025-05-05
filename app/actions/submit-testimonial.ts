"use server"

import { sendEmail } from "./send-email"

export async function submitTestimonial(data: {
  name: string
  email: string
  role: string
  project: string
  testimonial: string
  rating: number
}) {
  const { name, email, role, project, testimonial, rating } = data

  if (!name || !email || !testimonial || !rating) {
    return { success: false, message: "Missing required fields." }
  }

  try {
    const emailResult = await sendEmail({
      to: "atom.print05@gmail.com", // Original intended recipient (for reference only)
      replyTo: email, // Set reply-to as the form submitter's email
      subject: `New Testimonial from ${name}`,
      html: `
        <h2>New Testimonial Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <p><strong>Testimonial:</strong></p>
        <blockquote>${testimonial}</blockquote>
      `,
    })

    if (!emailResult.success) {
      return { success: false, message: emailResult.message || "Failed to send testimonial. Please try again." }
    }

    return { success: true, message: "Testimonial sent successfully." }
  } catch (error) {
    console.error("Email send failed:", error)
    return { success: false, message: "Failed to send testimonial. Please try again." }
  }
}
