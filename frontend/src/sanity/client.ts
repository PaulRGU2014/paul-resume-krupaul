import "server-only";
import { draftMode } from "next/headers";
import { createClient, type QueryOptions, type QueryParams } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { apiVersion, dataset, projectId } from "./env";

// Optional read token for draft mode
const token = process.env.SANITY_API_READ_TOKEN;

const sharedConfig = {
  projectId,
  dataset,
  apiVersion,
} as const;

const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true";

export const client = createClient({
  ...sharedConfig,
  useCdn,
  token: token || undefined,
  stega: {
    enabled:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
      process.env.NODE_ENV === "development" ||
      !!token,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "/admin",
  },
});

const builder = imageUrlBuilder(sharedConfig);
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;
  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  let dynamicRevalidate = revalidate;
  if (isDraftMode) {
    dynamicRevalidate = 0;
  } else if (process.env.NODE_ENV === "development") {
    dynamicRevalidate = 0;
  } else if (tags.length) {
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token,
        perspective: "drafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}
