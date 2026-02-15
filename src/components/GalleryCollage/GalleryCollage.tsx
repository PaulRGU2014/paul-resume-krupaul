"use client"

import CollageDefault from "./CollageDefault/CollageDefault"
import SquareLogos from "./SquareLogos/SquareLogos"

/**
 * GalleryCollage entry — tolerant prop handling:
 * - Accepts either props or props.content
 * - Unwraps nested `content` up to a few levels
 * - Strips common zero-width / bidi characters from for_component
 */
function stripZeroWidth(input: any) {
  if (typeof input !== "string") return input;
  // remove zero-width, BOM, bidi and similar invisible characters and trim
  return input.replace(/[\u200B\uFEFF\u200C\u200D\u2060\u200E\u200F]/g, "").trim();
}

export default function GalleryCollage(props: any) {
  // normalize incoming props: accept props or props.content and unwrap nested content
  let content = (props as any).content ?? props;
  let depth = 0;
  while (content && content.content && depth < 5) {
    content = content.content;
    depth++;
  }

  const forComponentRaw =
    content?.for_component ?? content?.forComponent ?? content?.type;
  const forComponent = stripZeroWidth(forComponentRaw);

  if (!forComponent) return null;

  switch (forComponent) {
    case "galleryCollage":
      return <CollageDefault content={content} />;
    case "squareLogos":
      return <SquareLogos content={content} />;
    default:
      return <div>Gallery Collage component not found</div>;
  }
}