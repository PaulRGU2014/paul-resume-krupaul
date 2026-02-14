import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
import {client} from '../lib/client'
import { formatDateKeyYYYYMMDD } from '../lib/subscribers'
import {Card, Text, Stack} from '@sanity/ui'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SubscriptionData {
  createdAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

function SubscriberChart() {
  const [chartData, setChartData] = useState<ChartData | null>(null)

  useEffect(() => {
    // Use the correct schema type 'subscriptionForm'
    client.fetch<SubscriptionData[]>(`*[_type == "subscriptionForm"] | order(createdAt asc){createdAt}`)
      .then((items) => {
        const countsByDay = items.reduce((acc, {createdAt}) => {
          const date = formatDateKeyYYYYMMDD(createdAt);
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setChartData({
          labels: Object.keys(countsByDay),
          datasets: [{
            label: 'Sign-ups per day',
            data: Object.values(countsByDay),
            borderColor: '#2276FC',
            backgroundColor: 'rgba(34, 118, 252, 0.5)',
          }]
        });
      })
      .catch(console.error);
  }, []);

  return (
    <Card padding={4} shadow={1} tone="default">
      <Stack space={3}>
        <Text size={2} weight="semibold">Subscriber Growth</Text>
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <Text>Loading chart...</Text>
        )}
      </Stack>
    </Card>
  )
}

export default {
  name: 'subscriber-chart',
  component: SubscriberChart,
  layout: {width: 'large' as const}
}