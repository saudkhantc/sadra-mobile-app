"use client";
import { ForgotPassword } from "@/schema";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wraper";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetRequestPasswordThunk } from "@/lib/redux-store/features/thunks/user/request-reset-password-thunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import { FormError } from "./form-error";
import { useEffect } from "react";
import { FormSuccess } from "./form-success";

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.requestResetPasswordReducer);

  const form = useForm<z.infer<typeof ForgotPassword>>({
    resolver: zodResolver(ForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPassword>) => {
    dispatch(resetRequestPasswordThunk(values));
  };


  return (
    <CardWrapper
      headerLabel="Request Reset"
      href="/auth/login"
      hrefLabel="Go Back"
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
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {state.error ? <FormError message={state.error} /> : null}
          {state.successMessage ? <FormSuccess message={state.successMessage} /> : null}
          <br />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
