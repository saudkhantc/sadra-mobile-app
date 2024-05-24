import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] m-auto ">
        <ResetPasswordForm token={params.token} />
      </div>
    </div>
  );
}
