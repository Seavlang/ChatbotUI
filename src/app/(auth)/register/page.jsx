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
import { FcGoogle } from "react-icons/fc"; 
import { FaGithub } from "react-icons/fa"; 
import { registerAction } from "@/actions/authAction";
import { useRouter } from "next/navigation";

// Updated validation schema with enhanced password checks
const signUpSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((value) => /[a-z]/.test(value), "Password must contain at least one lowercase letter")
      .refine((value) => /[A-Z]/.test(value), "Password must contain at least one uppercase ")
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), "Password must contain at least one special character")
      .refine((value) => /\d/.test(value), "Password must contain at least one digit")
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

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const route = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const res = await registerAction({
      username: values?.username,
      email: values?.email,
      password: values?.password,
    });
    setIsLoading(false);

    if (res?.success === true) {
      localStorage.setItem("registeredEmail", values?.email);
      toast.success("Registered Successfully!");
      route.push("/verify" + "?email=" + values?.email);
      route.refresh();
    } else {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-blue-400">
        Create an account
      </h2>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="h-12 text-base placeholder:text-gray-500 px-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
  
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
                    className="h-12 text-base px-4 placeholder:text-gray-500 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                      className="h-12 text-base placeholder:text-gray-500 px-4 pr-10 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...field}
                      className="h-12 text-base px-4 placeholder:text-gray-500 pr-10 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConPassword(!showConPassword)}
                    >
                      {showConPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-300" />
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
            className="w-full bg-primary text-white h-12 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Create account"}
          </Button>
        </form>
      </Form>
  
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-primary dark:text-blue-400">
          Sign in
        </a>
      </div>
  
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
        <hr className="flex-grow border-gray-300 dark:border-gray-600" />
      </div>
  
      <div className="w-full">
        <button className="flex items-center w-full mb-5 justify-center p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <FcGoogle className="mr-2" /> Google
        </button>
        <button className="flex items-center w-full justify-center p-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <FaGithub className="mr-2" /> Github
        </button>
      </div>
    </div>
  </div>
  
  );
}
