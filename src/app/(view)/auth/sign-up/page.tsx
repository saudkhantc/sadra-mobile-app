import { RegisterUserForm } from "@/components/auth/register-form";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] m-auto ">
        <RegisterUserForm />
      </div>
    </div>
  );
}
