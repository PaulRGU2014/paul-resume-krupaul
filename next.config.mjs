/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {},
  reactStrictMode: false,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"], // Disable deprecation warnings, come back when we update the system
  },

  // Add security headers (Content-Security-Policy)
  async headers() {
    return [
      {
        // Apply to all routes — change the source pattern if you want to limit this
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              // Allow analytics and inline/js eval for legacy widgets
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              // Images from site, data URIs and any https image host
              "img-src 'self' data: https:; " +
              "font-src 'self' https://fonts.gstatic.com data:; " +
              "connect-src 'self' https://*.vercel.app https://www.google-analytics.com; " +
              // Allow framing for same-origin pages and Vimeo player used on site
              "frame-src 'self' https://player.vimeo.com; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "upgrade-insecure-requests;"
          }
        ]
      }
    ];
  },
};
 
export default nextConfig;