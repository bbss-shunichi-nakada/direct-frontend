import { reactive } from 'vue';
import type { ZodObject, ZodRawShape, ZodType, infer as Infer } from 'zod';

export const useZodForm = <T extends ZodObject<ZodRawShape>>(schema: T) => {
  type FormType = Infer<T>;

  const form = reactive<FormType>({} as FormType);
  const errors = reactive<Partial<Record<keyof FormType, string>>>(
    {}
  ) as Partial<Record<keyof FormType, string>>;

  // フォーム全体のバリデーションチェック
  const validate = (): boolean => {
    const result = schema.safeParse(form);
    Object.keys(errors).forEach((k) => delete errors[k as keyof FormType]);

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormType;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      return false;
    }

    return true;
  };

  // フィールド単体のバリデーションチェック
  const validateField = <K extends keyof FormType>(field: K): void => {
    const fieldSchema = schema.shape[field as string] as ZodType;
    const result = fieldSchema.safeParse(form[field as string]);
    if (!result.success) {
      errors[field] = result.error.issues[0]?.message ?? '無効な値です';
    } else {
      errors[field] = undefined;
    }
  };

  // 入力時にエラークリア
  const clearError = (field: keyof FormType) => {
    errors[field] = undefined;
  };

  return {
    form,
    errors,
    validate,
    validateField,
    clearError,
  };
};
