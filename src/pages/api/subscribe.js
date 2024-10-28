"use server";
// pages/api/subscribe.js
import webPush from 'web-push';

// Configure VAPID keys (generate your own keys and replace these values)
const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webPush.setVapidDetails(
  "mailto:aboodgmail@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Variable to hold the interval ID
let intervalId;

export async function handler(subscription) {
    console.log("Subscription received:", subscription);
    const payload = JSON.stringify({ title: "Test Notification" });
    
    try {
        // Clear any existing interval to avoid multiple intervals running
        clearInterval(intervalId);

        // Start sending notifications every 3 seconds
        intervalId = setInterval(async () => {
            try {
                await webPush.sendNotification(subscription, payload);
                console.log("Notification sent successfully.");
            } catch (error) {
                console.error("Error sending notification:", error);
            }
        }, 3000); // 3000 milliseconds = 3 seconds
        
        // Optional: Stop sending notifications after a certain duration
        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Stopped sending notifications.');
        }, 30000); // Stops after 30 seconds (10 notifications total)
    } catch (error) {
        console.error("Error in handler:", error);
    }
}
