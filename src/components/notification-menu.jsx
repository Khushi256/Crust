"use client"

import { useState } from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialNotifications = [
  {
    id: 1,
    user: "✨ Chris Tompson",
    action: "Welcome to Crust!",
    target: " Check out our signature fire-baked pies and start building your custom slice",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    user: "🔥 Hot Deal Alert! ",
    action: "Get 25% off any large pizza today only!",
    target: "Use code SLICEDAY at checkout.",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    user: "🍕 Love the Vibe? ",
    action: "We're open until 10 PM! ",
    target: "Tap here for directions and grab a seat.",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    user: "👋 Still Hungry?",
    action: "Your cart is waiting!",
    target: "Finish your order now before your custom pie gets cold!",
    timestamp: "12 hours ago",
    unread: false,
  },
]

function Dot({
  className
}) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true">
      <circle cx="3" cy="3" r="3" />
    </svg>
  );
}

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({
      ...notification,
      unread: false,
    })))
  }

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map((notification) =>
      notification.id === id
        ? { ...notification, unread: false }
        : notification))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground relative size-8 rounded-full shadow-none"
          aria-label="Open notifications">
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <div
              aria-hidden="true"
              className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"></div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="hover:bg-accent rounded-md px-3 py-2 text-sm transition-colors">
            <div className="relative flex items-start pe-3">
              <div className="flex-1 space-y-1">
                <button
                  className="text-foreground/80 text-left after:absolute after:inset-0"
                  onClick={() => handleNotificationClick(notification.id)}>
                  <span className="text-foreground font-medium hover:underline">
                    {notification.user}
                  </span>{" "}
                  {notification.action}{" "}
                  <span className="text-foreground font-medium hover:underline">
                    {notification.target}
                  </span>
                  .
                </button>
                <div className="text-muted-foreground text-xs">
                  {notification.timestamp}
                </div>
              </div>
              {notification.unread && (
                <div className="absolute end-0 self-center">
                  <span className="sr-only">Unread</span>
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
