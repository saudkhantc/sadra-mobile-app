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

import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wraper";
import signupThunk from "@/lib/redux-store/features/thunks/user/signup-thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import { useCallback, useEffect, useTransition } from "react";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useRouter } from "next/navigation";

export function RegisterUserForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.signupReducer);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      dispatch(signupThunk(values));
    });
  };

  useEffect(() => {
    if (state.success) {
      router.push("/auth/login");
    }
  }, [state.success, router.push]);

  return (
    <CardWrapper
      headerLabel="Create an account"
      headerDescription="jhsd"
      href="/auth/login"
      hrefLabel="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
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
          {state.error ? <FormError message={state.error} /> : null}
          {state.success ? <FormSuccess message={state.success} /> : null}
          <br />
          <Button type="submit" className="w-full" disabled={isPending}>
            Signup
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
