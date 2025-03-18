import { z } from 'zod'

export const LOCAL_STORAGE_KEY = "shoppingcart";
export const ADD_TO_CART_EVENT = "addToCart";

export type ShoppingCartType = {
    userid: string,
    cart: ShoppingCartTypeWithoutUser
}

export type ShoppingCartTypeWithoutUser = {
    itemid: string,
    itemname: string,
    price: number,
    color?: string
}[]

export const LoginFormSchema = z.object({
    email: z
        .string()
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .email({ message: 'Please enter a valid email.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
});

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string()
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .email({ message: 'Please enter a valid email.' })
        .trim(),
})

export const ResetPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
});

export const SignupFormSchema = z.object({
    email: z
        .string()
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .email({ message: 'Please enter a valid email.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .max(200, { message: 'Can\'t be more than 200 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    firstname: z
        .string()
        .min(2, { message: 'Be at least 8 characters long' })
        .max(20, { message: 'Can\'t be more than 20 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .trim()
});

export const NameFormSchema = z.object({
    firstname: z
        .string()
        .min(2, { message: 'Be at least 8 characters long' })
        .max(20, { message: 'Can\'t be more than 20 characters long.' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .trim()
});

export type FormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
}
    | undefined;

export type SignupFormState =
    | {
    errors?: {
        email?: string[]
        password?: string[]
        firstname?: string[]
    }
    message?: string
}
    | undefined;

export type ForgotPasswordFormState =
    | {
    errors?: {
        email?: string[]
    }
    message?: string
    code: string
}
    | undefined;

export type ResetPasswordFormState =
    | {
    errors?: {
        password?: string[]
    }
    message?: string
    code: string
}
    | undefined;

export type NameFormState =
    | {
    errors?: {
        firstname?: string[]
    }
    message?: string
}
    | undefined;