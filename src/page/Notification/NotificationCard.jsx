"use client";

import { Check, CheckCheck, Trash2 } from "lucide-react";

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  const createdDate = new Date(notification.createdAt);
  //   const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
        notification.isRead
          ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
          : "bg-blue-50 border-blue-200 hover:bg-blue-100"
      }`}
    >
      {/* Unread Indicator */}
      {!notification.isRead && (
        <div className="flex-shrink-0 flex items-start pt-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate sm:text-base">
          {notification.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {notification.body}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          {/* <span className="text-xs text-gray-500">{timeAgo}</span> */}
          {notification.isClicked && (
            <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit">
              Clicked
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-end sm:justify-start">
        {!notification.isRead && onMarkAsRead && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-150"
            aria-label="Mark as read"
            title="Mark as read"
          >
            <Check size={18} />
          </button>
        )}
        {notification?.isRead && (
          <div className="p-2 text-green-600">
            <CheckCheck size={18} />
          </div>
        )}
        {/* {onDelete && (
          <button
            onClick={() => onDelete(notification.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
            aria-label="Delete notification"
            title="Delete notification"
          >
            <Trash2 size={18} />
          </button>
        )} */}
      </div>
    </div>
  );
}
