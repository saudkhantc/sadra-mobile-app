import { Spinner } from "@/components/spinner";

export default function LoadingUI() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}
