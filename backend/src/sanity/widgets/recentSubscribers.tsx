import React, {useEffect, useState} from 'react'
import {client} from '../lib/client' // Adjusted import path
import { safeLocaleString } from '../lib/subscribers'
import {Card, Stack, Text} from '@sanity/ui'

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

function RecentSubscribers() {
  const [subs, setSubs] = useState<Subscriber[]>([])

  useEffect(() => {
    // Fetch all subscribers of type 'subscriptionForm'
    client.fetch<Subscriber[]>(`*[_type == "subscriptionForm"] | order(createdAt desc){_id, email, createdAt}`)
      .then(setSubs)
      .catch(console.error)
  }, [])

  return (
    <Card padding={4} shadow={1} tone="default">
      <Stack space={3}>
        <Text size={2} weight="semibold">All Subscribers</Text>
        <Stack space={2} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {subs.length > 0 ? (
            subs.map((s) => (
              <Text key={s._id}>{s.email} — {safeLocaleString(s.createdAt)}</Text>
            ))
          ) : (
            <Text>No subscribers yet.</Text>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default {
  name: 'recent-subscribers',
  component: RecentSubscribers,
  layout: {width: 'medium' as const}
}