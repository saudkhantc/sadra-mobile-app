"use client";
import { ResetPassword } from "@/schema";
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
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import { resetPasswordThunk } from "@/lib/redux-store/features/thunks/user/reset-password";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.resetPasswordReducer);
  const form = useForm<z.infer<typeof ResetPassword>>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetPassword>) => {
    dispatch(resetPasswordThunk({ token, password: values.password }));
  };
  return (
    <CardWrapper
      headerLabel="Reset password"
      href="/auth/login"
      hrefLabel="Go Back"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {state.error ? <FormError message={state.error} /> : null}
          {state.successMessage ? (
            <FormSuccess message={state.successMessage} />
          ) : null}
          <br />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
