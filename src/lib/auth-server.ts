"use server";
import { auth } from "./auth";
import "dotenv/config";

export const adminLogin = async (prevState: any, formData: FormData) => {
  const { password } = Object.fromEntries(formData);

  try {
    await auth.api.signInEmail({
      body: {
        email: process.env["ADMIN_EMAIL"] as string,
        password: password as string,
      },
    });

    return {
      success: "Login successfully",
    };
  } catch (error) {
    return {
      error: error?.body?.message,
    };
  }
};
