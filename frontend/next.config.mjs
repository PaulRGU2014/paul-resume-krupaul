/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
  reactStrictMode: false,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"], // Disable deprecation warnings, come back when we update the system
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
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
              // Allow Sanity visual-editing scripts and CDN, analytics, and inline/js eval for legacy widgets
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://core.sanity-cdn.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
              // Images from site, data URIs and any https image host
              "img-src 'self' data: https:; " +
              "font-src 'self' https://fonts.gstatic.com data:; " +
              // Allow Sanity API endpoints (https and realtime wss), Sanity CDN, Vercel and analytics
              "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.api.sanity.io https://core.sanity-cdn.com https://*.vercel.app https://www.google-analytics.com https://www.google.com https://www.gstatic.com; " +
              // Allow framing for same-origin pages and Vimeo player used on site
              "frame-src 'self' https://player.vimeo.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; " +
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
