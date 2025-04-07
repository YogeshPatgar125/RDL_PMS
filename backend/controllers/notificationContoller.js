const Notification = require("../models/notification");

exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.body;
    await Notification.updateMany({ userId }, { read: true }); // ✅ correct field
    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error marking notifications" });
  }
};

