"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "left" | "right"
  delay?: number
}

export default function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active")
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  const getRevealClass = () => {
    switch (direction) {
      case "left":
        return "reveal-left"
      case "right":
        return "reveal-right"
      default:
        return "reveal"
    }
  }

  return (
    <div ref={sectionRef} className={`${getRevealClass()} ${className}`}>
      {children}
    </div>
  )
}
