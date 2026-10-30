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

  return (
    <main
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12 bg-gray-50"
      aria-labelledby="login-title"
    >
      {/* Centered Container */}
      <div className="w-full max-w-md space-y-6">
        {/* Header Section */}
        <header className="text-center space-y-2">
          <h1
            id="login-title"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            Welcome Back
          </h1>

          <p className="text-sm text-gray-600">
            Log in to experience DevConnect
          </p>
        </header>

        {/* Form Container */}
        <section
          className="bg-white border rounded-xl shadow-sm p-6"
        >
          <LoginForm />
        </section>
      </div>
    </main>
  );
}