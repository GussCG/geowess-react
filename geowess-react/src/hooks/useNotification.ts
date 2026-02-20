import { useState, useEffect } from "react";
import { notificationService } from "../services/notification.service";

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    async function fetch() {
      const { data } = await notificationService.getUnread(userId as string);
      setNotifications(data ?? []);
    }

    fetch();
  }, [userId]);

  return { notifications };
}
