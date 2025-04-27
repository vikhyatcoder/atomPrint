import type { Metadata } from "next"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | Atom Print",
  description: "Get in touch with Atom Print for inquiries about our 3D printing services or to start your project.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Us</h1>
      <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground">
        Have questions or ready to start your project? Get in touch with our team.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}
