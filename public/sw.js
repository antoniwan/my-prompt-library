// Minimal no-op service worker to avoid 404s on service worker requests.
// This file can be extended later with real offline/caching behavior.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Pass-through: do not intercept any requests.
});
