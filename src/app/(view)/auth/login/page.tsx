import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px]">
        <LoginForm />
      </div>
    </div>
  );
}
