import { z } from 'zod';

// Zod validations 
const validateFullNameSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const validateAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

// Zod validation for the user schema
export const userValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: validateFullNameSchema,
    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: validateAddressSchema,
});

export default userValidationSchema;
