import { cookies } from "next/headers";
import CreateAccountForm from "@/components/auth/CreateAccountForm";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function RegisterPage() {
  //Check Authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // Redirect Authenticated Users To Feed
  if (token && verifyToken(token)) {
    redirect("/feed");
  }
  // REGISTER PAGE (SERVER ROUTE COMPONENT)
  return (
    <main
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
      aria-labelledby="register-title"
    >
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">

        {/* PAGE HEADER */}
        <header className="space-y-3 text-center">
          <h1
            id="register-title"
            className="bg-[linear-gradient(90deg,#172653_0%,#354b97_45%,#a32972_100%)] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl"
          >
            Create Your Account
          </h1>

          <p className="text-sm leading-7 text-[#536382]">
            Join DevConnect and start connecting with other developers in the community.
          </p>
        </header>

        {/* FORM WRAPPER */}
        <section
          className="rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6 shadow-[0_8px_30px_rgba(35,50,104,0.05)] sm:p-8"
          aria-label="Registration form"
        >
          <CreateAccountForm />
        </section>

      </div>
    </main>
  );
}