// No-op service worker; registration was removed from the layout (roadmap item 9).
// Kept so existing registrations do not 404. Can be extended later for offline/caching.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Pass-through: do not intercept any requests.
});
