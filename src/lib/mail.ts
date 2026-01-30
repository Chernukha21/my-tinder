import {Resend} from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
    const link = `${baseUrl}/verify-email?token=${token}`;
    const {data, error} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "chorniy2008@ukr.net",
        subject: "Verify your email address",
        html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email address:</p>
      <p><a href="${link}">Verify Email</a></p>
    `,
    });

    if (error) {
        console.error("Resend error:", error); // shows 403 with reason if blocked
        throw new Error(error.message ?? "Failed to send verification email");
    }

    return data;
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const link = `http://localhost:3000/reset-password?token=${token}`;
    const {data, error} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "chorniy2008@ukr.net",
        subject: "Reset your password",
        html: `
      <h1>You have requested to reset your password</h1>
      <p>Click the link below to reset your password</p>
      <p><a href="${link}">Reset password</a></p>
    `,
    });

    if (error) {
        console.error("Resend error:", error); // shows 403 with reason if blocked
        throw new Error(error.message ?? "Failed to send verification email");
    }

    return data;
}