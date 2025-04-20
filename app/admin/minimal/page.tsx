"use client"

import { useEffect } from "react"

export default function MinimalTest() {
  useEffect(() => {
    console.log("Minimal test component mounted")
  }, [])

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f3f4f6",
      padding: "2rem"
    }}>
      <div style={{ 
        backgroundColor: "white", 
        padding: "2rem", 
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        maxWidth: "32rem",
        width: "100%"
      }}>
        <h1 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "bold", 
          marginBottom: "1rem",
          color: "#111827"
        }}>
          Minimal Test Page
        </h1>
        <p style={{ color: "#4B5563" }}>
          If you can see this, Next.js is working correctly.
        </p>
      </div>
    </div>
  )
} 