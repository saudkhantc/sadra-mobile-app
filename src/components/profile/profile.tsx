"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { Camera, Edit } from "lucide-react";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import userDetailUpdateThunk from "@/lib/redux-store/features/thunks/user/user-detail-update";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  bio: z.string().min(2).max(50),
  password: z.string().min(8),
});

export const Profile = () => {
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState(true);
  const [email, setEmail] = useState(true);
  const [bio, setBio] = useState(true);

  const state = useAppSelector((state) => state.userDetail);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }

    // const token = localStorage.getItem("token") as string;
    // startTransition(() => {
    //   dispatch(
    //     userDetailUpdateThunk({
    //       username: values.username,
    //       bio: values.bio,
    //       token,
    //     })
    //   );
    // });
  }

  useEffect(() => {
    form.setValue("username", state.user.username);
    form.setValue("email", state.user.email);
    form.setValue("bio", state.user.bio);
  }, [state.user]);

  return (
    <div className="flex gap-4 p-11">
      <div className="w-1/4">
        <div className="flex flex-col items-center justify-start">
          <Avatar className="w-40 h-40">
            <AvatarImage src={state.user.image} />
            <AvatarFallback className="bg-orange-600 text-6xl text-white ">
              {state.user.username.slice(0, 2) ?? "CN"}
            </AvatarFallback>
          </Avatar>
          <label htmlFor="inputImages" className="cursor-pointer">
            <Camera />
          </label>
          <Input type="file" id="inputImages" style={{ display: "none" }} />
        </div>
      </div>
      <div className="border-l-2 flex-1 px-3 ">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user information"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit" className="w-full">
              save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
