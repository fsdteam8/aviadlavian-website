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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signUpSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Too short"),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
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
          <h2 className="text-2xl font-semibold text-[#0fb7a8]">
            Create Your Account
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Create your account to start booking, hosting, and sharing kitchens
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Row */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                      First Name
                    </h4>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <h4 className="text-[10px] text-[#f7f0e4] uppercase">
                      Last Name
                    </h4>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="border-[#f7f0e4] bg-transparent py-5 focus-visible:ring-[#0fb7a8]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <Button
              type="submit"
              className="w-full bg-[#0fb7a8] py-6 text-white hover:bg-[#0da396]"
            >
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <button className="text-[#0fb7a8] hover:underline">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
