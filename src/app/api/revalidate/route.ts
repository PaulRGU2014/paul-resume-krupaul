import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Revalidation webhook endpoint for Sanity.
 * Expects ?secret=<SANITY_WEBHOOK_SECRET> and a JSON body containing a slug or document with slug.current
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: any = {};
  try {
    payload = await request.json().catch(() => ({}));
  } catch {
    payload = {};
  }

  try {
    // Accept direct slug string or common shapes Sanity might send.
    // Support both `slug.current` and custom `page_url.current`.
    const slugFromBody =
      typeof payload === "string"
        ? payload
        : payload?.slug ||
          payload?.page_url ||
          (payload?.document && payload.document.slug && payload.document.slug.current) ||
          (payload?.document && payload.document.page_url && payload.document.page_url.current) ||
          payload?.meta?.slug;

    const revalidated: string[] = [];

    if (slugFromBody && typeof slugFromBody === "string") {
      // Ensure slug starts with a leading slash
      const path = slugFromBody.startsWith("/") ? slugFromBody : `/${slugFromBody}`;
      await revalidatePath(path);
      revalidated.push(path);
      revalidateTag(`pages:${path}`);
      revalidated.push(`tag:pages:${path}`);
    }

    // Always revalidate shared tags used by page data and global chrome.
    revalidateTag("pages");
    revalidated.push("tag:pages");
    revalidateTag("header");
    revalidated.push("tag:header");
    revalidateTag("footer");
    revalidated.push("tag:footer");

    return NextResponse.json({ ok: true, revalidated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}