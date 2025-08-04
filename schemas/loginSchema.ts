// schemas/loginSchema.ts

import { z } from 'zod';

// ログインフォームのバリデーションスキーマ
export const loginSchema = z.object({
  email: z.string().email('正しいメールアドレス形式で入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

// zod から TypeScript の型を自動生成（Formの型と連携）
export type LoginForm = z.infer<typeof loginSchema>;
