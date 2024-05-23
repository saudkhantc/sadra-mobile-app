import { ShieldEllipsisIcon } from "lucide-react";


interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <span className="flex gap-2 items-center">
        <ShieldEllipsisIcon size={30} />
        <h1 className="text-3xl font-semibold">Auth</h1>
      </span>
      <p className="text-muted-foreground text-">{label}</p>
    </div>
  );
};
