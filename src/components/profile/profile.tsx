"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";
import { Camera, Edit, Loader, Loader2, LucideEdit2 } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import userDetailUpdateThunk from "@/lib/redux-store/features/thunks/user/user-detail-update";
import uploadImageThunk from "@/lib/redux-store/features/thunks/upload/upload-image-thunk";
import withProtectedRoute from "@/lib/with-protected-routes";
import { Spinner } from "../spinner";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  bio: z.string().min(2).max(50),
});

type ImageFile = File | null;

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

const Profile = () => {
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState(true);
  const [bio, setBio] = useState(true);
  const [imageFile, setImageFile] = useState<ImageFile>(null);

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
    const token = localStorage.getItem("token") as string;
    const stateUser = state.user as User;
    startTransition(() => {
      for (const [key, value] of Object.entries(values)) {
        if (key in stateUser && stateUser[key as keyof User] !== value) {
          dispatch(
            userDetailUpdateThunk({
              username: values.username,
              bio: values.bio,
              token,
            })
          );
        }
      }
      if (imageFile) {
        dispatch(
          uploadImageThunk({
            imageFile,
            token,
          })
        );
      }
    });
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  useEffect(() => {
    form.setValue("username", state.user.username);
    form.setValue("email", state.user.email);
    form.setValue("bio", state.user.bio);
  }, [state.user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="relative flex flex-col items-center justify-start w-1/4 py-2">
            <Avatar className="w-40 h-40">
              <AvatarImage src={state.user.image} />
              <Loader2 />
              <AvatarFallback className="bg-orange-600 text-6xl text-white ">
                {state.user.username.slice(0, 2) ?? "CN"}
              </AvatarFallback>
            </Avatar>
            <label htmlFor="inputImages" className="cursor-pointer">
              <Camera />
            </label>
            <Input
              type="file"
              id="inputImages"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1 border-l-2 px-9 py-2">
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
                      disabled={true}
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
                    <span className="flex items-center cursor-pointer gap-2">
                      <Input
                        placeholder="johndoe123"
                        type="text"
                        {...field}
                        disabled={!userName ? isPending : userName}
                      />
                      <Edit onClick={() => setUserName(!userName)} />
                    </span>
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
                    <span className="flex items-center cursor-pointer gap-2">
                      <Input
                        placeholder="user information"
                        type="text"
                        disabled={!bio ? isPending : bio}
                        {...field}
                      />
                      <Edit onClick={() => setBio(!bio)} />
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default withProtectedRoute(Profile);
