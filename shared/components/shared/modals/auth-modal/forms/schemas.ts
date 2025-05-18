import { z } from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});


// * merge - расширение формы, как entends в JS
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
