import recentSubscribers from './widgets/recentSubscribers'
import subscriberChart from './widgets/subscriberChart'
import csvExport from './widgets/csvExport'
import type { DashboardPluginConfig } from '@sanity/dashboard'

export const dashboardConfig: DashboardPluginConfig = {
  widgets: [
    // Our custom widgets
    recentSubscribers,
    subscriberChart,
    csvExport,

    // A built-in widget that displays project information
    {
      name: 'project-info',
      layout: {width: 'medium'},
    } as any,

    // A built-in widget that lists the 5 most recently created subscriptions
    {
      name: 'document-list',
      options: {
        title: 'Recent Submissions',
        order: '_createdAt desc',
        limit: 5,
        types: ['subscriptionForm']
      },
      layout: {width: 'medium'},
    } as any
  ]
}