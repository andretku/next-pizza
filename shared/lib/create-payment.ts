import { PaymentData } from '@/@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

// * функция перехода в платежную систему - работает только после регистрации тестового магазина на сайте yookassa.ru

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      // то что вернется после оплаты или в случае ошибки:
      metadata: {
        order_id: details.orderId,
      },
      // куда перекинет после успешной оплаты:
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_STORE_ID as string,
        password: process.env.YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7), // уникальный ключ любой
      },
    },
  );

  return data;
}
