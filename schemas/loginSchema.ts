import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email({ message: '正しいメールアドレス形式で入力してください' })
    .default(''),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください' })
    .max(100, { message: 'パスワードは100文字以内で入力してください' })
    .regex(/[a-z]/, { message: '小文字を1文字以上含めてください' })
    .regex(/[A-Z]/, { message: '大文字を1文字以上含めてください' })
    .regex(/[0-9]/, { message: '数字を1文字以上含めてください' })
    .regex(/[^a-zA-Z0-9]/, { message: '記号を1文字以上含めてください' })
    .default(''),
});

export type LoginForm = z.infer<typeof loginSchema>;
