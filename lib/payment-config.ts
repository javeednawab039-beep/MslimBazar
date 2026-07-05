export const PAYMENT_ACCOUNTS = {
  jazzcash: {
    label: 'JazzCash',
    number: '03225202822',
    accountName: 'Nawab Khan',
  },
  easypaisa: {
    label: 'EasyPaisa',
    number: '03326310309',
    accountName: 'Nawab Khan',
  },
} as const;

export type PaymentMethodKey = keyof typeof PAYMENT_ACCOUNTS;
