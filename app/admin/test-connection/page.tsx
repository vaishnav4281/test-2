'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState('Checking...')
  const [error, setError] = useState<string | null>(null)
  const [tablesStatus, setTablesStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function testConnection() {
      try {
        // Test database connection by trying to list tables
        const { data: tables, error: dbError } = await supabase
          .from('testimonials')
          .select('*')
          .limit(1)

        if (dbError) {
          // If the error is about table not existing, that's okay - we just need to create it
          if (dbError.message.includes('relation "public.testimonials" does not exist')) {
            setTablesStatus({
              testimonials: false,
              policies: false,
              media_files: false,
              website_content: false,
              inquiries: false
            })
          } else {
            throw dbError
          }
        } else {
          setConnectionStatus('Connected!')
        }

        // Test storage connection
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('media')
          .list()

        if (storageError) {
          setError(prev => prev ? `${prev}\nStorage Error: ${storageError.message}` : `Storage Error: ${storageError.message}`)
          setConnectionStatus('Failed')
        } else {
          setConnectionStatus('Connected!')
        }
      } catch (err) {
        setConnectionStatus('Failed')
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full ${connectionStatus === 'Connected!' ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span>Status: {connectionStatus}</span>
        </div>
        
        {Object.keys(tablesStatus).length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Database Tables Status:</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(tablesStatus).map(([table, exists]) => (
                <div key={table} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${exists ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span>{table}: {exists ? 'Exists' : 'Missing'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            <h2 className="font-bold mb-2">Errors:</h2>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        {Object.values(tablesStatus).some(exists => !exists) && (
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
            <h2 className="font-bold mb-2">Next Steps:</h2>
            <p>Some required tables are missing. Please run the SQL commands in your Supabase SQL Editor to create the necessary tables.</p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Required Tables:</h3>
              <ul className="list-disc list-inside">
                <li>testimonials</li>
                <li>policies</li>
                <li>media_files</li>
                <li>website_content</li>
                <li>inquiries</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 