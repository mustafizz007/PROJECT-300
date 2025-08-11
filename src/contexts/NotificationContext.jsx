/* eslint-disable react-refresh/only-export-components */import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleString(),
      isRead: false,
    };
    setNotifications((prev) => [notification, ...prev.slice(0, 9)]); // Keep only 10 recent notifications
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.isRead).length;
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    getUnreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
