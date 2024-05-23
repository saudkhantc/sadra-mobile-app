import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription?: string;
  href: string;
  hrefLabel: string;
}

export function CardWrapper({
  children,
  headerLabel,
  headerDescription,
  href,
  hrefLabel,
}: CardWrapperProps) {
  return (
    <Card className="bg-white p-3 rounded-md shadow-md mt-3">
      <CardHeader>
        <CardTitle>
          <Header label={headerLabel} />
        </CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={href}
          className="border-b border-transparent hover:border-b hover:border-blue-600 text-blue-600 text-sm"
        >
          {hrefLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
