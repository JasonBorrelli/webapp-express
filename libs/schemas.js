import { z } from "zod";

const gameFields = {
  name: z.string().trim().min(1, "name must be a non-empty string"),
  description: z.string().nullable(),
  price: z.number().nonnegative("price must be a non-negative number"),
  categoryId: z.number().int().positive("categoryId must be a positive integer"),
};

export const gameCreateSchema = z.object({
  name: gameFields.name,
  description: gameFields.description.optional(),
  price: gameFields.price,
  categoryId: gameFields.categoryId,
});

export const gameUpdateSchema = z
  .object({
    name: gameFields.name.optional(),
    description: gameFields.description.optional(),
    price: gameFields.price.optional(),
    categoryId: gameFields.categoryId.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field is required",
  });

const categoryFields = {
  name: z.string().trim().min(1, "name must be a non-empty string"),
  description: z.string().nullable(),
};

export const categoryCreateSchema = z.object({
  name: categoryFields.name,
  description: categoryFields.description.optional(),
});

export const categoryUpdateSchema = z
  .object({
    name: categoryFields.name.optional(),
    description: categoryFields.description.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field is required",
  });
