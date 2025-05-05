import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Atom Print",
  description: "Learn about how Atom Print collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <p className="text-muted-foreground text-center mb-8">Last updated: May 10, 2024</p>

        <section className="mb-8">
          <h2>Introduction</h2>
          <p>
            At Atom Print ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website or use our 3D printing services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access the site or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2>Information We Collect</h2>

          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Fill out forms on our website (such as contact or order forms)</li>
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a quote</li>
            <li>Submit a testimonial</li>
            <li>Correspond with us via email, phone, or messaging</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing/shipping address</li>
            <li>Payment information</li>
            <li>Educational institution or company (if applicable)</li>
            <li>Project details and specifications</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate our website. This information
            does not reveal your specific identity but may include:
          </p>
          <ul>
            <li>Device and browser information</li>
            <li>IP address</li>
            <li>Operating system</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on those pages</li>
            <li>Referring website addresses</li>
            <li>Geographic location (country/city level)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>How We Collect Information</h2>

          <h3>Direct Collection</h3>
          <p>
            We collect information directly from you when you provide it to us through forms, account registration,
            email communications, or other direct interactions.
          </p>

          <h3>Automated Collection</h3>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities.
            Cookies are small text files stored on your device that help us provide you with a better browsing
            experience.
          </p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Necessary for the website to function properly
            </li>
            <li>
              <strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors and see how they
              move around our website
            </li>
            <li>
              <strong>Functionality cookies:</strong> Enable us to personalize your experience
            </li>
            <li>
              <strong>Targeting cookies:</strong> Record your visit to our website, the pages you visit, and the links
              you follow
            </li>
          </ul>
          <p>
            You can set your browser to refuse all or some browser cookies or to alert you when websites set or access
            cookies. If you disable or refuse cookies, please note that some parts of this website may become
            inaccessible or not function properly.
          </p>
        </section>

        <section className="mb-8">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing, operating, and maintaining our website and services</li>
            <li>Processing and fulfilling your 3D printing orders</li>
            <li>Improving, personalizing, and expanding our website and services</li>
            <li>Understanding and analyzing how you use our website</li>
            <li>Developing new products, services, features, and functionality</li>
            <li>Communicating with you about your orders, inquiries, or requests</li>
            <li>Sending you technical notices, updates, security alerts, and support messages</li>
            <li>Providing customer support and responding to your questions</li>
            <li>Marketing and advertising our services to you (with your consent where required by law)</li>
            <li>Protecting our website and services from abuse, fraud, or unauthorized use</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Data Retention</h2>
          <p>
            We will retain your personal information only for as long as is necessary for the purposes set out in this
            Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal
            obligations, resolve disputes, and enforce our policies.
          </p>
          <p>
            Usage data is generally retained for a shorter period, except when this data is used to strengthen the
            security or to improve the functionality of our service, or we are legally obligated to retain this data for
            longer periods.
          </p>
          <p>Specifically:</p>
          <ul>
            <li>
              Account information: Retained for as long as your account is active or as needed to provide you services
            </li>
            <li>Order information: Retained for 7 years for tax and accounting purposes</li>
            <li>Communication records: Retained for 2 years after your last interaction with us</li>
            <li>Testimonials: Retained until you request removal</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>
              <strong>Access:</strong> You can request copies of your personal information
            </li>
            <li>
              <strong>Rectification:</strong> You can request that we correct inaccurate or complete incomplete
              information
            </li>
            <li>
              <strong>Erasure:</strong> You can request that we delete your personal information in certain
              circumstances
            </li>
            <li>
              <strong>Restriction:</strong> You can request that we restrict the processing of your information in
              certain circumstances
            </li>
            <li>
              <strong>Data portability:</strong> You can request that we transfer your information to another
              organization or directly to you
            </li>
            <li>
              <strong>Objection:</strong> You can object to our processing of your personal information
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided in the "Contact Us"
            section below. We may need to verify your identity before responding to your request.
          </p>
          <p>
            You can also opt out of marketing communications by following the unsubscribe instructions included in our
            marketing emails or by contacting us directly.
          </p>
        </section>

        <section className="mb-8">
          <h2>Security of Your Information</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p>Our security measures include:</p>
          <ul>
            <li>Encryption of sensitive data</li>
            <li>Secure socket layer (SSL) technology</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication procedures</li>
            <li>Regular software updates and patches</li>
            <li>Staff training on data protection and security practices</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Third-Party Services</h2>
          <p>
            We may use third-party service providers to help us operate our website, process payments, analyze how our
            website is used, or assist with our marketing efforts. These third parties may have access to your personal
            information only to perform these tasks on our behalf and are obligated not to disclose or use it for any
            other purpose.
          </p>
          <p>
            Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links
            or enabling those connections may allow third parties to collect or share data about you. We do not control
            these third-party websites and are not responsible for their privacy statements. We encourage you to read
            the privacy policy of every website you visit.
          </p>
          <p>Third-party services we use may include:</p>
          <ul>
            <li>
              <strong>Analytics:</strong> Google Analytics
            </li>
            <li>
              <strong>Payment processing:</strong> Stripe, PayPal
            </li>
            <li>
              <strong>Email marketing:</strong> Mailchimp
            </li>
            <li>
              <strong>Customer support:</strong> Zendesk
            </li>
            <li>
              <strong>Social media:</strong> Facebook, Instagram, Twitter
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Children's Privacy</h2>
          <p>
            Our website and services are not intended for children under the age of 16. We do not knowingly collect
            personal information from children under 16. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us, and we will delete such information from our
            systems.
          </p>
        </section>

        <section className="mb-8">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this page. You are advised to
            review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when
            they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: atom.print05@gmail.com</li>
            <li>By phone: +91 72308 24524</li>
            <li>By mail: D-Mart pratapnagar, Jaipur</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
