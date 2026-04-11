"use client";

import { useState } from "react";
import NotificationCard from "./NotificationCard";
import { useGetNotificationsQuery } from "../redux/api/manageApi";
import { CgSpinner } from "react-icons/cg";
import { Pagination } from "antd";

export default function NotificationsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetNotificationsQuery({
    page: currentPage,
    limit: pageSize,
  });
  const notifications = data?.data || [];
  const meta = data?.meta || {};

  const handleMarkAsRead = (id) => {
    // setNotifications((prevNotifications) =>
    //   prevNotifications.map((notif) =>
    //     notif.id === id ? { ...notif, isRead: true } : notif,
    //   ),
    // );
  };

  const handleDelete = (id) => {
    // setNotifications((prevNotifications) =>
    //   prevNotifications.filter((notif) => notif.id !== id),
    // );
  };

  // const handleMarkAllAsRead = () => {
  //   // setNotifications((prevNotifications) =>
  //   //   prevNotifications.map((notif) => ({
  //   //     ...notif,
  //   //     isRead: true,
  //   //   })),
  //   // );
  // };

  // const handleDeleteAll = () => {
  //   // setNotifications([]);
  // };

  //const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Notifications
              </h1>
            </div>
            <div className="flex gap-2 items-center">
              <CgSpinner className="animate-spin text-blue-600" size={24} />
              <h1>Fetching...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {notifications.length} total
                {/* {unreadCount > 0 && ` • ${unreadCount} unread`} */}
              </p>
            </div>

            {/* Action Buttons */}
            {/* {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150 border border-blue-200"
                  >
                    <Check size={16} />
                    <span className="hidden sm:inline">Mark all read</span>
                    <span className="sm:hidden">Read all</span>
                  </button>
                )}
                <button
                  onClick={handleDeleteAll}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-150 border border-red-200"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete all</span>
                  <span className="sm:hidden">Clear</span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full mb-4">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No notifications
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:space-y-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {meta?.totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={meta?.total || 0}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
