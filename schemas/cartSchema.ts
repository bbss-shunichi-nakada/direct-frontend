import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  quantity: z.number().int().min(1),
  image: z.string().url().optional(),
  maxQty: z.number().int().min(1).optional(),
});

export const cartSchema = z.array(cartItemSchema);

export type CartItemInput = z.infer<typeof cartItemSchema>;
