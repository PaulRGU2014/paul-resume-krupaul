import React, {useState, useEffect, useCallback} from 'react'
import {client} from '../lib/client'
import { safeDateISO, validateEmail, escapeCsvField } from '../lib/subscribers'
import {Card, Stack, Button, Text, Spinner} from '@sanity/ui'

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
  source?: string;
  tags?: string[];
}

function CsvExport() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subscriberCount, setSubscriberCount] = useState<number>(0)

  // Fetch subscriber count on component mount
  useEffect(() => {
    client.fetch<number>(`count(*[_type == "subscriptionForm"])`)
      .then(setSubscriberCount)
      .catch(console.error)
  }, [])

  // Function to fetch subscribers using GROQ query
  const fetchSubscribers = useCallback(async (): Promise<Subscriber[]> => {
    const query = `*[_type == "subscriptionForm"] | order(createdAt asc) {
      _id, email, createdAt, source, tags
    }`
    return client.fetch<Subscriber[]>(query)
  }, [])

  // Function to deduplicate subscribers by email, keeping the earliest entry
  const deduplicateSubscribers = useCallback((subscribers: Subscriber[]): Subscriber[] => {
    const uniqueSubscribers = new Map<string, Subscriber>()
    
    subscribers.forEach(subscriber => {
      const email = validateEmail(subscriber.email)
      if (!email) return // skip invalid/missing emails
      if (!uniqueSubscribers.has(email)) {
        uniqueSubscribers.set(email, subscriber)
      }
    })
    
    return Array.from(uniqueSubscribers.values())
  }, [])

  // Function to convert data to CSV string
  const convertToCSV = useCallback((subscribers: Subscriber[]): string => {
    const headers = ['Email', 'Subscribed At', 'Source', 'Tags']
    const csvRows = [headers.join(',')]
    
    subscribers.forEach(subscriber => {
      const row = [
        // Prefer validated email for export but fallback to raw if somehow missing
        escapeCsvField(validateEmail(subscriber.email) ?? subscriber.email ?? ''),
        escapeCsvField(safeDateISO(subscriber.createdAt)),
        escapeCsvField(subscriber.source || ''),
        escapeCsvField(subscriber.tags ? subscriber.tags.join('; ') : '')
      ]
      csvRows.push(row.join(','))
    })
    
    return csvRows.join('\n')
  }, [])

  // Function to trigger CSV download
  const downloadCSV = useCallback((csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }, [])

  // Main export function
  const handleExport = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Fetch all subscribers
      const allSubscribers = await fetchSubscribers()
      
      // Deduplicate by email
      const uniqueSubscribers = deduplicateSubscribers(allSubscribers)
      
      // Convert to CSV
      const csvContent = convertToCSV(uniqueSubscribers)
      
      // Generate filename with current date
      const today = new Date()
      const dateString = today.toISOString().split('T')[0] // YYYY-MM-DD format
      const filename = `subscribers-export-${dateString}.csv`
      
      // Trigger download
      downloadCSV(csvContent, filename)
      
    } catch (err) {
      console.error('Export failed:', err)
      setError(err instanceof Error ? err.message : 'An error occurred during export')
    } finally {
      setIsLoading(false)
    }
  }, [fetchSubscribers, deduplicateSubscribers, convertToCSV, downloadCSV])

  return (
    <Card padding={4} shadow={1} tone="default">
      <Stack space={3}>
        <Text size={2} weight="semibold">Export Subscribers</Text>
        <Text size={1} muted>
          Download a CSV file containing all subscribers with duplicate emails removed.
        </Text>
        {subscriberCount > 0 && (
          <Text size={1} muted>
            Total subscribers: {subscriberCount}
          </Text>
        )}
        {error && (
          <Text size={1} style={{color: 'red'}}>
            Error: {error}
          </Text>
        )}
        <Button
          text={isLoading ? 'Exporting...' : 'Download CSV'}
          tone="primary"
          onClick={handleExport}
          disabled={isLoading}
          icon={isLoading ? Spinner : undefined}
        />
      </Stack>
    </Card>
  )
}

export default {
  name: 'csv-export',
  component: CsvExport,
  layout: {width: 'medium' as const}
}