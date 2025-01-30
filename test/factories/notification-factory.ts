import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '@app/entities/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'any-category',
    content: new Content('any-content'),
    recipientId: 'any-recipient-id',
    ...override,
  });
}
