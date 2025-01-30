import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Get notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'any-recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'any-recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'other-recipient-id' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'any-recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'any-recipient-id' }),
        expect.objectContaining({ recipientId: 'any-recipient-id' }),
      ]),
    );
  });
});
