"use client";
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

import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wraper";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import { loginThunk } from "@/lib/redux-store/features/thunks/user/login-thunk";
import { useRouter } from "next/navigation";
import { saveTokenToLocalStorage } from "@/lib/redux-store/features/slices/user/login-slice";
import { FormError } from "./form-error";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const state = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      dispatch(loginThunk(values));
    });
  };

  useEffect(() => {
    if (state.token) {
      dispatch(saveTokenToLocalStorage());
      router.push("/auth/profile");
    }
  }, [state.token]);

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      href="/auth/sign-up"
      hrefLabel="Don't hav an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 mb2">
            <Link
              href="/forgot-password"
              className="border-b border-transparent hover:border-b hover:border-black  items-center"
            >
              Forgot Password
            </Link>
          </div>
          {state.error ? <FormError message={state.error} /> : null}
          <br />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
