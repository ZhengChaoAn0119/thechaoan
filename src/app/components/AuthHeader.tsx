"use client";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";

export default function AuthHeader({ locale }: { locale: string }) {
  const { data: session } = useSession();
  if (session?.user) return <UserMenu user={session.user} locale={locale} />;
  return <LoginButton locale={locale} />;
}
