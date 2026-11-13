import { MailtrapClient } from 'mailtrap'

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_SANDBOX_ID,
  sandbox: true,
  testInboxId: 5021285,
})
