import 'server-only'

export const token = process.env.SANITY_API_READ_TOKEN

// Security check to ensure token is not exposed to client
if (typeof window !== 'undefined') {
  throw new Error('SANITY_API_READ_TOKEN should not be accessed on the client side')
}

// Note: experimental_taintUniqueValue is not available in all React versions
// This is a security feature to prevent tokens from being exposed to the client
// but the application will work without it
if (token && typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only inform in development that token is loaded
  console.info('SANITY_API_READ_TOKEN is loaded and secured for server-side use only.')
}