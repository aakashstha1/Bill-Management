/* eslint-disable no-undef */
// Service Worker — handles push events

self.addEventListener("push", (event) => {
  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon.png", // optional
    }),
  );
});

// On notification click — open the frontend /bills page
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(
      "http://localhost:5173" + (event.notification.data?.url || "/bills"),
    ),
  );
});
