import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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
            Log in to continue to your dashboard
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