"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
  { name: "Terms of Services", href: "/terms" },
  { name: "3D analyzer", href: "/3d-analyzer" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }, [])

  // Handle scroll effect with passive listener for better performance
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold">
              <span className="text-primary">Atom</span>
              <span className="text-green-400">Print</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            <Link href="/services">Start Printing</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md fixed inset-0 top-[72px] z-40 mobile-nav-container">
          <div className="container mx-auto px-4 py-4 flex flex-col h-full">
            <div className="space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto pb-8">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                <Link href="/services">Start Printing</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
