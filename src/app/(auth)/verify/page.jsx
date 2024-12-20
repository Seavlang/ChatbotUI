"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { verifyEmailAction, resendVerificationCodeAction } from "@/actions/authAction"; // Import resend action
import { useSession } from "next-auth/react";

// Define the validation schema for code
const codeSchema = z.object({
  code: z.string().min(6, "Code must be 6 characters").max(6, "Code must be 6 characters"),
});

export default function CodeVerificationForm() {
  const [email,setEmail] = useState(null)

  console.log("email in verification",email);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("registeredEmail");
      console.log("storeEmail",storedEmail);
      setEmail(storedEmail);
    }
  },[])

  const form = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const res = await verifyEmailAction({
      email,
      code: values.code,
    });
    setIsLoading(false);

    if (res?.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error("Invalid verification code. Please try again.");
    }
  }

  async function handleResend() {
    try {
      const res = await resendVerificationCodeAction(encodeURIComponent(email));
      if (res.success) {
        toast.success("Verification code resent successfully!");
      } else {
        toast.error("Failed to resend verification code. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-800">Code Verification</h2>
        <p className="text-center text-gray-500">An authentication code has been sent to your email.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Code"
                      {...field}
                      className="h-12 text-base placeholder:text-gray-500 px-4 rounded-md border-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />

            <div className="text-center">
              <a href="/login" className="text-sm text-primary">Back to Login</a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white h-12 rounded-md font-semibold hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500">
        <p>Didn&apos;t receive a code?</p>
          <button onClick={handleResend} className="text-primary underline">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
