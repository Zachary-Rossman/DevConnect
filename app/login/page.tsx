import { cookies } from "next/headers";
import LoginForm from "@/components/auth/LoginForm";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function LoginPage() {
  //Check Authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Redirect Authenticated Users To Feed
  if (token && verifyToken(token)) {
    redirect("/feed");
  }

  // Render Page

  return (
    <main
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-6 py-12"
      aria-labelledby="login-title"
    >
      {/* Centered Container */}
      <div className="relative z-10 w-full max-w-md space-y-6 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">
        {/* Header Section */}
        <header className="space-y-2 text-center">
          <h1
            id="login-title"
            className="text-3xl font-black tracking-tight text-[#172653] sm:text-4xl"
          >
            Welcome Back
          </h1>

          <p className="text-sm leading-6 text-[#536382]">
            Log in to experience DevConnect
          </p>
        </header>

        {/* Form Container */}
        <section
          className="rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6 shadow-[0_8px_30px_rgba(35,50,104,0.05)]"
        >
          <LoginForm />
        </section>
      </div>
    </main>
  );
}