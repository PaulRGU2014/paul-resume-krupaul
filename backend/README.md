# Sanity Studio backend

Standalone Sanity Studio for KruPaul content. Commands:

- `npm install`
- `npm run dev` – local Studio on http://localhost:3333
- `npm run build` – build static Studio into `dist/`
- `npm run start` – serve the built Studio

Required env (use `backend/.env.local`; copy from `backend/.env.example`):

- `SANITY_STUDIO_PROJECT_ID` (or `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- `SANITY_STUDIO_DATASET` (or `NEXT_PUBLIC_SANITY_DATASET`)
- `SANITY_API_READ_TOKEN` (needed if the dataset is private or for dashboard widgets)
- `SANITY_STUDIO_API_VERSION` (optional, defaults to 2024-08-15)
- `SANITY_STUDIO_PREVIEW_ORIGIN` (optional, for Presentation tool)
