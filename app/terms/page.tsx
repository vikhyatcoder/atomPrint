import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Services | Atom Print",
  description: "Terms and conditions for using Atom Print's 3D printing services.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Terms of Services</h1>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Atom Print's services, you acknowledge that you have read, understood, and agree to be
          bound by these Terms of Service.
        </p>

        <h2>2. Service Description</h2>
        <p>
          Atom Print provides 3D printing services for various applications including but not limited to prototyping,
          educational models, architectural models, and personalized gifts.
        </p>

        <h2>3. Order Process</h2>
        <p>
          All orders are subject to review before printing. We reserve the right to refuse any order that violates our
          policies or that we deem inappropriate.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          By submitting designs for printing, you confirm that you own the intellectual property rights or have
          permission to reproduce the item. You agree to indemnify Atom Print against any claims of intellectual
          property infringement.
        </p>

        <h2>5. Payment Terms</h2>
        <p>
          Payment is required in advance for all orders. Prices are subject to change without notice. Additional charges
          may apply for complex designs or rush orders.
        </p>

        <h2>6. Delivery and Shipping</h2>
        <p>
          Delivery times are estimates and not guarantees. Atom Print is not responsible for delays caused by shipping
          carriers or customs.
        </p>

        <h2>7. Refunds and Returns</h2>
        <p>
          Due to the custom nature of our products, refunds are only available for defective items or significant
          deviations from specifications. Claims must be made within 7 days of receipt.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          Atom Print's liability is limited to the cost of the ordered products. We are not liable for any consequential
          or incidental damages.
        </p>

        <h2>9. Privacy Policy</h2>
        <p>
          We collect and process personal data in accordance with our Privacy Policy, which is incorporated into these
          Terms of Service.
        </p>

        <h2>10. Modifications to Terms</h2>
        <p>
          Atom Print reserves the right to modify these terms at any time. Continued use of our services after changes
          constitutes acceptance of the modified terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>These terms are governed by the laws of India.</p>

        <p className="text-sm text-muted-foreground mt-8">Last updated: May 2, 2024</p>
      </div>
    </div>
  )
}
