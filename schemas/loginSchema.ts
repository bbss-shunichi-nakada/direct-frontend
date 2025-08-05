// schemas/loginSchema.ts

import { z } from 'zod';

// ログインフォームのバリデーションスキーマ
export const loginSchema = z.object({
  email: z.email('正しいメールアドレス形式で入力してください'),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください' })
    .max(100, { message: 'パスワードは100文字以内で入力してください' })
    .regex(/[a-z]/, { message: '小文字を1文字以上含めてください' })
    .regex(/[A-Z]/, { message: '大文字を1文字以上含めてください' })
    .regex(/[0-9]/, { message: '数字を1文字以上含めてください' })
    .regex(/[^a-zA-Z0-9]/, { message: '記号を1文字以上含めてください' }),
});

// zod から TypeScript の型を自動生成（Formの型と連携）
export type LoginForm = z.infer<typeof loginSchema>;
