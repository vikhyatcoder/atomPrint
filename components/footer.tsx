import Link from "next/link"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a0c16] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-primary">Atom</span>
                <span className="text-green-400">Print</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              A student-run 3D printing startup turning creative ideas into tangible prints.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/atom_print_?igsh=MmVuanF2bjJvdjRu"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-gray-200 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-gray-200 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-gray-200 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gray-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">
                  Terms of Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 72308 24524</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>atom.print05@gmail.com</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>D-Mart pratapnagar, Jaipur</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>© {new Date().getFullYear()} Atom Print. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Powered by <span className="font-medium">Vikhyat Agrawal</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
