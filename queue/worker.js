import Notification from "../model/notificationModel.js";

const MAX_RETRIES = 3;

export const sendNotificationJob = async (notification) => {
  try {
    const { type, message, userId } = notification;

    console.log(` Sending ${type} to user ${userId}: ${message}`);

    const success = Math.random() > 0.2; 

    if (!success) throw new Error("Failed to send");

    await Notification.findByIdAndUpdate(notification._id, { status: "sent" });
    console.log(` Notification sent successfully.`);
  } catch (error) {
    const updated = await Notification.findById(notification._id);
    if (updated.retries < MAX_RETRIES) {
      updated.retries += 1;
      console.log(` Retry ${updated.retries} for notification ${updated._id}`);
      await updated.save();
      setTimeout(() => sendNotificationJob(updated), 2000); 
    } else {
      await Notification.findByIdAndUpdate(notification._id, { status: "failed" });
      console.log(` Notification failed after ${MAX_RETRIES} retries.`);
    }
  }
};
