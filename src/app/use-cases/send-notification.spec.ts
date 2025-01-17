import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: 'Esta é uma notificação',
      category: 'Social',
      recipientId: 'any-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
