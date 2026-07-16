import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// Without an incremental cache, Workers has nowhere to keep the prerendered
// pages, so every request re-rendered `/` and `/market` from scratch, refetching
// BLS + GSA each time (~6s TTFB, and a fast track to the BLS daily rate limit).
// KV stores them, so the pages serve instantly and revalidate on their own
// schedule. KV (not R2) because it supports the writes revalidation needs;
// the static-assets backend is read-only.
export default defineCloudflareConfig({
	incrementalCache: kvIncrementalCache,
});
