import React, { useState } from "react";

const VAPID_PUBLIC_KEY =
  "BGbcdvCz_AQ0Mx3VzX8-Omplk1lmz45VLOw1RyEF-hrgvJDq1oOLFSSKl9PsUk54VRUfY2pr5zqyTgbqEjD66sA"; // paste your public key

// Convert VAPID key to Uint8Array (required by browser API)
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

function CustomerPage() {
  const [status, setStatus] = useState("");

  const enableNotifications = async () => {
    try {
      // 1. Register service worker
      const reg = await navigator.serviceWorker.register("/sw.js");
      setStatus("Service worker registered...");

      // 2. Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Permission denied. Please allow notifications.");
        return;
      }

      // 3. Subscribe to push
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // 4. Send subscription to backend
      await fetch("http://localhost:5000/api/subscriptions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      setStatus("✅ Notifications enabled! You will receive bill alerts.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong: " + err.message);
    }
  };

  return (
    <div className="page">
      <h1>Customer Notification Setup</h1>
      <p>Click below to receive bill notifications on this device.</p>
      <button onClick={enableNotifications}>Enable Notifications</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default CustomerPage;
