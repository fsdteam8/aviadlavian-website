"use client";

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
import { signInSchema } from "../schema/singInSchema";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f0e4] p-4">
      <div className="w-full max-w-[500px] rounded-xl bg-[#1f2123] p-8 text-white shadow-2xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold uppercase tracking-widest">
            Logo
          </h1>
          <h2 className="text-2xl font-semibold text-[#0fb7a8]">Welcome</h2>
          <p className="mt-2 text-xs text-gray-400">
            Manage your orders, track shipments, and configure products easily.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                    Email Address
                  </h4>
                  <FormControl>
                    <Input
                      placeholder="hello@example.com"
                      {...field}
                      className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                    Password
                  </h4>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...field}
                      className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me & Forgot Password Section */}
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-[#f7f0e4] data-[state=checked]:bg-[#0fb7a8] data-[state=checked]:border-[#0fb7a8]"
                      />
                    </FormControl>
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-400 cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </FormItem>
                )}
              />

              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#0fb7a8] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0fb7a8] py-6 text-white hover:bg-[#0da396]"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don&apos;t have an account? </span>
          <Link href={"/auth/sign-up"}>
            <button className="text-[#0fb7a8] hover:underline cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
