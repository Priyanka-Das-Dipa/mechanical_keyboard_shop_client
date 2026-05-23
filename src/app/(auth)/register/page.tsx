import Link from "next/link";
import RegisterForm from "@/src/components/auth/RegisterFrom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="glass p-10 md:p-12 rounded-3xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-(--primary) rounded-xl flex items-center justify-center text-2xl">
                ⌨️
              </div>
              <h1 className="text-3xl font-bold tracking-tight">KeyCraft</h1>
            </Link>
            <h2 className="text-3xl font-semibold">Join the Community</h2>
            <p className="text-(--muted-text) mt-2">Create your account</p>
          </div>

          <RegisterForm />

          <p className="text-center text-(--muted-text) mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
