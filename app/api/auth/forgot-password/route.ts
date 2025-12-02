import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const existingUser = await db.user.findUnique({ where: { email } });

    // We return 200 even if user not found for security (prevent email fishing)
    if (!existingUser) {
      return new NextResponse("If email exists, reset link sent.", { status: 200 });
    }

    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour expiration

    // Clear old tokens
    await db.passwordResetToken.deleteMany({ where: { email } });

    await db.passwordResetToken.create({
      data: { email, token, expires },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "Solidwriter Support <support@solidwriter.com>", // UPDATED DOMAIN
      to: email,
      subject: "Reset your password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p>You requested a password reset for Solidwriter. Click the button below to set a new password:</p>
          <a href="${resetLink}" style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email. The link expires in 1 hour.</p>
        </div>
      `
    });

    return new NextResponse("Email sent", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}