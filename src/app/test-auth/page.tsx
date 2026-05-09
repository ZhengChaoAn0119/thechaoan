import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function TestAuthPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-md p-8 flex flex-col gap-6">
        <h1 className="text-xs font-bold tracking-widest uppercase text-zinc-400 text-center">
          Auth Test Page
        </h1>

        {session ? (
          <>
            <div className="flex flex-col items-center gap-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              )}
              <div className="text-center">
                <p className="text-white font-medium">{session.user?.name}</p>
                <p className="text-zinc-400 text-sm">{session.user?.email}</p>
              </div>
            </div>

            <pre className="bg-zinc-900 rounded-lg p-4 text-xs text-zinc-400 overflow-auto max-h-48 whitespace-pre-wrap break-all">
              {JSON.stringify(session, null, 2)}
            </pre>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/test-auth" });
              }}
            >
              <button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold tracking-widest uppercase rounded py-2 transition-colors"
              >
                Sign out
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-zinc-500 text-sm text-center">Not signed in.</p>

            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/test-auth" });
              }}
            >
              <button
                type="submit"
                className="w-full bg-white hover:bg-zinc-100 text-zinc-900 text-sm font-medium rounded py-2 flex items-center justify-center gap-2 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
