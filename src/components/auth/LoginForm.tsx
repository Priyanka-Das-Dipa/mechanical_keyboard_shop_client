/* eslint-disable react-hooks/immutability */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setCredentials } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // or RegisterFormData
    try {
      const response = await loginUser(data).unwrap();
      if (!response?.tokens?.accessToken) {
        toast.error("No access token received from server");
        return;
      }

      const token = response.tokens.accessToken;
      document.cookie = `token=${token}; path=/; secure; samesite=none`;
      dispatch(
        setCredentials({
          user: response.user,
          token,
        }),
      );

      toast.success("Login successful! Welcome back 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm text-(--muted-text) mb-2">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
          placeholder="you@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-(--muted-text) mb-2">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-4 text-(--muted-text) hover:text-white"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="accent-(--primary)"
            disabled={isLoading}
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-(--primary) hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-(--primary) hover:bg-[var(--primary-hover)] disabled:opacity-70 transition-all text-black font-semibold py-4 rounded-2xl text-lg active:scale-[0.985]"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
