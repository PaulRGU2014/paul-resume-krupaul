This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment variables

- Use env files instead of inline script variables:
	- Development: `.env.development.local` (gitignored)
	- Local production-like: `.env.local` (gitignored)
	- Example: `.env.example` (non-secret placeholders)

- Public keys (`NEXT_PUBLIC_*`) are exposed to the browser. Keep secrets (tokens, passwords) only in `.env.*.local` and your hosting provider.
- For Vercel, set the same keys in Project Settings → Environment Variables or sync locally with `vercel env pull .env.local`.

Scripts now use standard Next.js commands and read from env files:

```bash
npm run dev      # uses .env.development.local
npm run build    # uses .env.local
npm run start    # uses .env.local
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
