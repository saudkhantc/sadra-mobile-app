import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-orange-600 gap-4">
      <h1 className="text-4xl font-semibold">Page Not Found</h1>
      <p>
        Oops! The page you are looking for could not be found. Please check the
        URL or go back to the homepage.
      </p>
      <Link href="/" className="bg-orange-600 text-white p-2 rounded-md">Home Page</Link>
    </div>
  );
}
