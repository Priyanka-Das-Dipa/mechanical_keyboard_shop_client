import Link from "next/link";
import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <div className="glass p-10 md:p-12 rounded-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-(--primary) rounded-xl flex items-center justify-center text-2xl">
                ⌨️
              </div>
              <h1 className="text-3xl font-bold tracking-tight">KeyCraft</h1>
            </Link>
            <h2 className="text-3xl font-semibold">Welcome Back</h2>
            <p className="text-(--muted-text) mt-2">
              Sign in to continue your keyboard journey
            </p>
          </div>

          <LoginForm />

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-(--border-color)"></div>
            <span className="text-(--muted-text) text-sm">OR</span>
            <div className="h-px flex-1 bg-(--border-color)"></div>
          </div>

          {/* Social Login */}
          <button className="w-full border border-(--border-color) hover:bg-white/5 transition-colors py-4 rounded-2xl flex items-center justify-center gap-3">
            {/* <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
              width={50}
              height={50}
            /> */}
            Continue with Google
          </button>

          <p className="text-center text-(--muted-text) mt-8">
            Don&lsquo;t have an account?{" "}
            <Link
              href="/register"
              className="text-(--primary) hover:underline font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
