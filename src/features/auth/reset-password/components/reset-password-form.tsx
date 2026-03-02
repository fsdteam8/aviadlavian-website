"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: ResetPasswordFormValues) {
    console.log(values);
    // Handle password reset logic here
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f0e4] p-4">
      <div className="w-full max-w-[500px] rounded-xl bg-[#1f2123] p-8 text-white shadow-2xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-2xl font-bold uppercase tracking-widest">
            LOGO
          </h1>
          <h2 className="text-2xl font-semibold text-[#0fb7a8]">
            Create a New Password
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Set a strong password to secure your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                    New Password
                  </h4>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      {...field}
                      className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm New Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                    Confirm New Password
                  </h4>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••"
                      {...field}
                      className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#0fb7a8] py-6 text-white hover:bg-[#0da396]"
            >
              Save Changes
            </Button>
          </form>
        </Form>

        {/* Link back to sign in */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Remember your password? </span>
          <a href="/auth/sign-in" className="text-[#0fb7a8] hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
