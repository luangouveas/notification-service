import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { Content } from '@app/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'any-category',
        content: new Content('any-content'),
        recipientId: 'any-recipient-id',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'any-category',
        content: new Content('any-content'),
        recipientId: 'any-recipient-id',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'any-category',
        content: new Content('any-content'),
        recipientId: 'other-recipient-id',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'any-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
