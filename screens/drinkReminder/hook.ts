import {useEffect, useState} from 'react';
import * as Notifications from 'expo-notifications';
import {ToastAndroid} from 'react-native';
import {requestPermissionNotificationReminder, startReminder} from './util';

export const useDrinkReminder = () => {
  const [isReminderActive, setIsReminderActive] = useState(false);

  // Request notification permissions on load
  useEffect(() => {
    requestPermissionNotificationReminder().then(({status}) => {
      if (status !== 'granted') {
        alert('Permission for notifications is required to set reminders.');
      }
    });
  }, []);

  useEffect(() => {
    getAllnoti();
  }, []);

  const getAllnoti = async () => {
    const not = await Notifications.getAllScheduledNotificationsAsync();
    setIsReminderActive(not.length > 0);
  };
  // Cancel existing notifications if reminder is paused
  const toggleReminder = async () => {
    if (isReminderActive) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      ToastAndroid.show('Reminder is paused', 3000);
    } else {
      scheduleReminder();
    }
    setIsReminderActive(!isReminderActive);
  };

  // Schedule notification based on selected interval
  const scheduleReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    startReminder();
    ToastAndroid.show(`Reminder set for every 2 hrs.`, 3000);
  };

  return {
    isReminderActive,
    toggleReminder,
  };
};
