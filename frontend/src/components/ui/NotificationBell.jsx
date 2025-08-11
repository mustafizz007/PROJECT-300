import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, X, Check } from "lucide-react";

export default function NotificationBell({
  notifications = [],
  onClearNotifications,
  onMarkAsRead,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Calculate dropdown position when opening
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px below the button
        right: window.innerWidth - rect.right, // Align to right edge of button
      });
    }
  }, [showDropdown]);

  const handleClearAll = () => {
    if (onClearNotifications) {
      onClearNotifications();
    }
    setShowDropdown(false);
  };

  const handleMarkAsRead = async (notificationId) => {
    if (onMarkAsRead) {
      try {
        await onMarkAsRead(notificationId);
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors relative"
        title={`${notifications.length} notifications (${unreadCount} unread)`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Portal-rendered notification dropdown - Bypasses all parent CSS constraints */}
      {showDropdown &&
        createPortal(
          <>
            {/* Full-screen backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              style={{ zIndex: 99998 }}
              onClick={() => setShowDropdown(false)}
            />

            {/* Dropdown positioned absolutely to viewport */}
            <div
              className="fixed w-80 bg-white border-2 border-gray-300 rounded-lg shadow-2xl"
              style={{
                zIndex: 99999,
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`,
                maxHeight: "400px",
              }}
            >
              {/* Header */}
              <div className="p-3 border-b border-gray-200 bg-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-800">
                    Notifications
                  </h3>
                  <div className="flex gap-2">
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-h-64 overflow-y-auto bg-white">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 ${
                        !notification.is_read ? "bg-blue-50" : "bg-white"
                      } hover:bg-gray-50`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2">
                          <p className="text-sm text-gray-800 font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(
                              notification.created_at
                            ).toLocaleDateString()}{" "}
                            {new Date(
                              notification.created_at
                            ).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.is_read && (
                            <>
                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                                className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
                                title="Mark as read"
                              >
                                ✓
                              </button>
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
