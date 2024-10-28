"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/authAction";

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login successful", values);
    setIsLoading(false);

    // Assuming loginAction function for API call
    const res = await loginAction({
      email: values.email,
      password: values.password,
    });

    if (res === null) {
      console.error("Login failed due to a network or endpoint error.");
    } else {
      console.log("Login response:", res);
      if (res.success) {
        toast.success("Logged in successfully!");
        router.push("/playground");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-800">Hey, there!</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      className="h-12 text-base px-4 rounded-md border-gray-300"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
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
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <a href="/forgotpassword" className="text-sm text-gray-500">Forgot Password?</a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white h-12 rounded-md font-semibold hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500">
          Create New Account? <a href="/register" className="text-primary">Sign up</a>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="w-full"> 
          <button className="flex items-center w-full mb-5 justify-center p-2 border rounded-md border-gray-300">
            <FcGoogle className="mr-2" /> Google
          </button>
          <button className="flex items-center w-full justify-center p-2 border rounded-md border-gray-300">
            <FaGithub className="mr-2" /> Github
          </button>
        </div>
      </div>
    </div>
  );
}
