# Email Setup Instructions for Atom Print

## Current Setup (Development/Testing)

Currently, the application is configured to use Resend in test mode. In this mode:

- Emails can only be sent to your verified email address (`vikhyatcoder@gmail.com`)
- All form submissions are forwarded to this email
- The original recipient is noted in the subject line
- Reply-to is set to the form submitter's email

## Setting Up for Production

To send emails to any recipient (like `atom.print05@gmail.com`), follow these steps:

1. **Verify a Domain with Resend**:
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add and verify your domain (e.g., atomprint.com)
   - Follow the DNS setup instructions provided by Resend

2. **Update the From Address**:
   - Once your domain is verified, update the `from` address in the code to use your domain
   - Example: `"Atom Print <contact@atomprint.com>"`

3. **Update the Recipient**:
   - After domain verification, you can remove the `VERIFIED_EMAIL` restriction
   - Update the code to send directly to `atom.print05@gmail.com` or any other address

4. **Update Environment Variables**:
   - Make sure your production environment has the `RESEND_API_KEY` set

## Code Changes Needed for Production

Once your domain is verified, update the `send-email.ts` file:

\`\`\`typescript
// Remove this line
const VERIFIED_EMAIL = "vikhyatcoder@gmail.com";

// And update this section to send directly to the intended recipient
const response = await resend.emails.send({
  from: "Atom Print <contact@yourdomain.com>", // Use your verified domain
  to: [to], // Send directly to the intended recipient
  subject: subject,
  html,
  reply_to: replyTo || to,
});
\`\`\`

## Testing

You can test the email functionality by:
1. Submitting the contact form
2. Submitting the testimonial form
3. Checking your verified email for the received messages
