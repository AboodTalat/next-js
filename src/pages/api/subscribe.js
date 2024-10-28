"use server"
// pages/api/subscribe.js
import webPush from 'web-push';

// Configure VAPID keys (generate your own keys and replace these values)
const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY

webPush.setVapidDetails(
  "mailto:aboodgmail@gmail.com",
  publicVapidKey,
  privateVapidKey
);

export  async function handler(subscription) {
    console.log("")
    const payload = JSON.stringify({ title: "Test Notification" });
    console.log("payload")

    try {
      await webPush.sendNotification(subscription, payload);
    } catch (error) {
      console.error("Error sending notification:", error);
    }

}
