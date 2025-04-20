"use client"

import { useEffect, useState } from "react"

export default function TestComponent() {
  const [status, setStatus] = useState<string>("Initializing...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Starting test...")
        
        // Test environment variables
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
        
        console.log("Environment variables:", {
          url: url ? "Present" : "Missing",
          key: key ? "Present" : "Missing"
        })

        if (!url || !key) {
          throw new Error("Missing environment variables")
        }

        // Test basic fetch
        const response = await fetch(url + "/rest/v1/policies?select=count", {
          headers: {
            "apikey": key,
            "Authorization": `Bearer ${key}`
          }
        })

        console.log("Fetch response:", response.status, response.statusText)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Response data:", data)

        setStatus("Connection successful!")
        
      } catch (err) {
        console.error("Detailed error:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
        setStatus("Connection failed")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Connection Test</h1>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Status:</p>
            <p className="text-gray-600">{status}</p>
          </div>
          {error && (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600 font-medium">Error:</p>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div>
            <p className="font-medium">Environment Variables:</p>
            <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
              {JSON.stringify({
                hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
                hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 