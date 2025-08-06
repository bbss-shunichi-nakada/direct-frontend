import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, '現在のパスワードは8文字以上で入力してください')
      .max(64)
      .default(''),
    newPassword: z
      .string()
      .min(8, '新しいパスワードは8文字以上で入力してください')
      .max(64)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        '大文字・小文字・数字を含めてください'
      )
      .default(''),
    confirmPassword: z
      .string()
      .min(8, '確認用パスワードは8文字以上で入力してください')
      .default(''),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '新しいパスワードと確認用パスワードが一致しません',
    path: ['confirmPassword'],
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
