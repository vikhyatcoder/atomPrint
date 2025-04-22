"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Services", href: "/services" },
  { name: "Orders", href: "/orders" },
  { name: "Customize", href: "/customize" },
  { name: "Blog", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 10 && !isScrolled) {
      setIsScrolled(true)
    } else if (window.scrollY <= 10 && isScrolled) {
      setIsScrolled(false)
    }
  }, [isScrolled])

  // Handle scroll effect with debounce and requestAnimationFrame
  useEffect(() => {
    let scrollTimer: number | null = null
    let isScrolling = false

    const debouncedScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        scrollTimer = window.requestAnimationFrame(() => {
          handleScroll()
          isScrolling = false
        })
      }
    }

    window.addEventListener("scroll", debouncedScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", debouncedScroll)
      if (scrollTimer !== null) {
        window.cancelAnimationFrame(scrollTimer)
      }
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

  // Simplified animation variants for better performance
  const menuItemVariants = {
    hidden: { opacity: 0, x: isMobile ? -10 : -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: isMobile ? 0.05 * i : 0.05 * i,
        duration: 0.2,
      },
    }),
  }

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
              <span className="text-secondary">Print</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild>
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: mobileMenuOpen ? -45 : 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: mobileMenuOpen ? 45 : -45 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md fixed inset-0 top-[72px] z-40 mobile-nav-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 72px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col h-full">
              <div className="space-y-1 py-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
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
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navigation.length * 0.05 }}
                >
                  <Button asChild className="w-full">
                    <Link href="/services">Start Printing</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
