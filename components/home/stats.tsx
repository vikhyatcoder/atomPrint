"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Printer, Users, Clock, Award } from "lucide-react"

const stats = [
  {
    id: 1,
    name: "Prints Delivered",
    value: 1500,
    icon: Printer,
    suffix: "+",
  },
  {
    id: 2,
    name: "Happy Clients",
    value: 350,
    icon: Users,
    suffix: "+",
  },
  {
    id: 3,
    name: "Hours Saved",
    value: 2800,
    icon: Clock,
    suffix: "+",
  },
  {
    id: 4,
    name: "Student Projects",
    value: 120,
    icon: Award,
    suffix: "+",
  },
]

export default function Stats() {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id="stats-section" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} inView={inView} />
              </h3>
              <p className="text-muted-foreground">{stat.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix = "", inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start > end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, inView])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}
