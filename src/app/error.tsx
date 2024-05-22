"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log error to the server
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-center py-12 px-4">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
        Oops! Something went wrong.
      </h1>
      <span className="text-destructive first-letter:capitalize">
        {error.message}
      </span>
      <p className="block text-gray-500 md:text-xl/relaxed xl:text-base/relaxed dark:text-gray-400">
        Don't worry, our team has been notified and we'll get this fixed as soon
        as possible.
      </p>
      <Button variant={"outline"} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
