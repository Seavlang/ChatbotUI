"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/actions/authAction"; // Import reset password action

// Define the validation schema for password and confirmPassword
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((value) => !/\s/.test(value), "Password cannot contain spaces"),
    confirmPassword: z
      .string()
      .min(8, "Please confirm your password")
      .refine((value) => !/\s/.test(value), "Password cannot contain spaces"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    if (!email) {
      toast.error("Email is missing. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPasswordAction({ email, password: values.password });
      if (res?.success) {
        toast.success("Password has been reset successfully!");
        router.push("/login");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Set a new password</h2>
        <p className="text-gray-600 text-sm mb-6">
          Your previous password has been reset. Please set a new password for your account.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Password"
                        {...field}
                        className="h-12 text-base px-4 pr-10 rounded-md border-gray-300"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Confirm Password Input */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConPassword ? "text" : "password"}
                        placeholder="Re-enter Password"
                        {...field}
                        className="h-12 text-base px-4 pr-10 rounded-md border-gray-300"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConPassword(!showConPassword)}
                      >
                        {showConPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Setting Password..." : "Set Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
