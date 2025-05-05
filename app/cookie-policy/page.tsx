import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | Atom Print",
  description: "Learn about how Atom Print uses cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Cookie Policy</h1>
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <p className="text-muted-foreground text-center mb-8">Last updated: May 10, 2024</p>

        <section className="mb-8">
          <h2>Introduction</h2>
          <p>
            This Cookie Policy explains how Atom Print ("we", "us", or "our") uses cookies and similar technologies on
            our website. This policy should be read alongside our <Link href="/privacy-policy">Privacy Policy</Link>,
            which explains how we use personal information.
          </p>
          <p>
            By continuing to browse or use our website, you agree to our use of cookies as described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. They are widely used
            to make websites work more efficiently and provide information to the website owners.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go
            offline, while session cookies are deleted as soon as you close your web browser.
          </p>
        </section>

        <section className="mb-8">
          <h2>How We Use Cookies</h2>
          <p>We use different types of cookies for various purposes:</p>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such as
            security, network management, and account access. You cannot opt out of these cookies.
          </p>
          <ul>
            <li>
              <strong>Cookie name:</strong> session_id
            </li>
            <li>
              <strong>Purpose:</strong> Maintains your session while you browse our website
            </li>
            <li>
              <strong>Duration:</strong> Session
            </li>
          </ul>
          <ul>
            <li>
              <strong>Cookie name:</strong> csrf_token
            </li>
            <li>
              <strong>Purpose:</strong> Helps protect against Cross-Site Request Forgery attacks
            </li>
            <li>
              <strong>Duration:</strong> Session
            </li>
          </ul>

          <h3>Performance/Analytics Cookies</h3>
          <p>
            These cookies collect information about how visitors use our website, such as which pages they visit most
            often and if they receive error messages. All information collected by these cookies is aggregated and
            anonymous.
          </p>
          <ul>
            <li>
              <strong>Cookie name:</strong> _ga, _ga_*
            </li>
            <li>
              <strong>Purpose:</strong> Google Analytics cookies used to distinguish users and sessions
            </li>
            <li>
              <strong>Duration:</strong> 2 years
            </li>
          </ul>
          <ul>
            <li>
              <strong>Cookie name:</strong> _gid
            </li>
            <li>
              <strong>Purpose:</strong> Google Analytics cookie used to distinguish users
            </li>
            <li>
              <strong>Duration:</strong> 24 hours
            </li>
          </ul>

          <h3>Functionality Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as your username, language, or the region
            you are in) and provide enhanced, more personal features.
          </p>
          <ul>
            <li>
              <strong>Cookie name:</strong> theme_preference
            </li>
            <li>
              <strong>Purpose:</strong> Remembers your preferred theme (light/dark)
            </li>
            <li>
              <strong>Duration:</strong> 1 year
            </li>
          </ul>

          <h3>Targeting/Advertising Cookies</h3>
          <p>
            These cookies are used to deliver advertisements more relevant to you and your interests. They are also used
            to limit the number of times you see an advertisement as well as help measure the effectiveness of
            advertising campaigns.
          </p>
          <ul>
            <li>
              <strong>Cookie name:</strong> _fbp
            </li>
            <li>
              <strong>Purpose:</strong> Used by Facebook to deliver advertisements
            </li>
            <li>
              <strong>Duration:</strong> 3 months
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Third-Party Cookies</h2>
          <p>Some cookies are placed by third parties on our website. These third parties may include:</p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Web analytics service provided by Google
            </li>
            <li>
              <strong>Facebook:</strong> Social media platform that may set cookies for sharing capabilities and
              advertising
            </li>
            <li>
              <strong>Payment processors:</strong> Services that process payments on our behalf
            </li>
          </ul>
          <p>
            Please note that we do not have control over these third-party cookies. You can check the respective privacy
            policies of these third parties for more information.
          </p>
        </section>

        <section className="mb-8">
          <h2>Managing Cookies</h2>
          <p>Most web browsers allow you to manage your cookie preferences. You can:</p>
          <ul>
            <li>Delete cookies from your device</li>
            <li>
              Block cookies by activating the setting on your browser that allows you to refuse all or some cookies
            </li>
            <li>Set your browser to notify you when you receive a cookie</li>
          </ul>
          <p>
            Please note that if you choose to block or delete cookies, you may not be able to access certain areas or
            features of our website, and some services may not function properly.
          </p>
          <p>Here are links to instructions on how to manage cookies in common browsers:</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last updated" date at the top of this page.
          </p>
          <p>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are
            effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact Us</h2>
          <p>If you have any questions about our use of cookies, please contact us:</p>
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
