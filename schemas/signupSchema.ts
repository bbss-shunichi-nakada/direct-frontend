import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email('正しいメールアドレスを入力してください').default(''),
  password: z.string().min(6, '6文字以上で入力してください').default(''),
  name: z.string().optional().default(''),
  kana: z.string().optional().default(''),
  postalCode: z
    .string()
    .regex(/^\d{3}-?\d{4}$/, '郵便番号を正しく入力してください')
    .optional()
    .default(''),
  prefecture: z.string().optional().default(''),
  address1: z.string().optional().default(''),
  address2: z.string().optional().default(''),
  phone: z
    .string()
    .regex(/^0\d{1,4}-?\d{1,4}-?\d{3,4}$/, '電話番号を正しく入力してください')
    .optional()
    .default(''),
  newsletter: z.boolean().optional().default(false),
});

export type SignupForm = z.infer<typeof signupSchema>;
