import CreateAccountForm from "@/components/auth/CreateAccountForm";

export default function RegisterPage() {
  // REGISTER PAGE (SERVER ROUTE COMPONENT)
  return (
    <main
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12 bg-gray-50"
      aria-labelledby="register-title"
    >
      <div className="w-full max-w-lg space-y-6">

        {/* PAGE HEADER */}
        <header className="space-y-2 text-center">
          <h1
            id="register-title"
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            Create Your Account
          </h1>

          <p className="text-gray-600 text-sm">
            Join DevConnect and start connecting with other developers in the community.
          </p>
        </header>

        {/* FORM WRAPPER */}
        <section
          className="bg-white border rounded-xl shadow-sm p-6"
          aria-label="Registration form"
        >
          <CreateAccountForm />
        </section>

      </div>
    </main>
  );
}