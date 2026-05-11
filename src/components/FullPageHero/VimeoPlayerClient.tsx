// This component is intentionally a no-op.
// The iframe query params already control playback behavior.
// Attaching the Vimeo JS SDK to background-mode embeds can emit noisy errors in dev.
export default function VimeoPlayerClient() {
  return null;
}