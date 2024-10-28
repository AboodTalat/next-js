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

        // Start sending notifications every second
        intervalId = setInterval(async () => {
            try {
                await webPush.sendNotification(subscription, payload);
                console.log("Notification sent successfully.");
            } catch (error) {
                console.error("Error sending notification:", error);
            }
        }, 1000); // 1000 milliseconds = 1 second
        
        // Optional: Stop sending notifications after a certain duration
        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Stopped sending notifications.');
        }, 10000); // Stops after 10 seconds
    } catch (error) {
        console.error("Error in handler:", error);
    }
}
