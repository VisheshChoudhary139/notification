import Notification from "../model/notificationModel.js";
import { sendNotificationJob } from "../queue/worker.js";

export const sendNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    const notification = new Notification({ userId, type, message });
    await notification.save();

    sendNotificationJob(notification);

    res.status(201).json({ message: "Notification created and queued.", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
