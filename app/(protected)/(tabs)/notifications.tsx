import { Text } from 'react-native';
import { schedulePushNotification } from '@/providers/NotificationsProvider';

export default function NotificationsScreen() {
  return (
    <Text onPress={schedulePushNotification} className='text-white'>
      No notifications yet
    </Text>
  );
}