'use server'
import {ForgotPasswordFormState, ForgotPasswordFormSchema} from "@/lib/definitions";
import {createClient} from "@/utils/supabase/server";

export async function forgot_password(state: ForgotPasswordFormState, formData: FormData) {
    const validateFields = ForgotPasswordFormSchema.safeParse({
        email: formData.get('email'),
    });
    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            code: state!.code
        }
    }
    console.log(`${state!.code}/password_reset`);
    const supabase = await createClient()
    await supabase.auth.resetPasswordForEmail(formData.get('email') as string, {
        redirectTo: `${state!.code}/password_reset`,
    })
    return {
        message: "If account does exist, an email has been sent. Reset your password with it.",
        code: state!.code
    }
}