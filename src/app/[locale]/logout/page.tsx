import { signOut } from "@/auth";
import AutoSubmitButton from "../../components/AutoSubmitButton";

export default async function LogoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  async function handleSignOut() {
    "use server";
    await signOut({ redirect: false });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-zinc-400 text-xs tracking-widest uppercase">
          Signing out…
        </p>
        <AutoSubmitButton action={handleSignOut} redirectTo={`/${locale}`} />
      </div>
    </div>
  );
}
