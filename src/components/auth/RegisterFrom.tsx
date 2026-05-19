/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { setCredentials } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        }),
      );

      toast.success("Account created successfully! 🎉");
      reset();
      router.push("/dashboard"); // Change route as needed
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm text-(--muted-text) mb-2">
          Full Name
        </label>
        <input
          {...register("name")}
          type="text"
          className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
          placeholder="Alex Chen"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

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
            placeholder="Create a strong password"
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

      {/* Confirm Password */}
      <div>
        <label className="block text-sm text-(--muted-text) mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
            placeholder="Confirm password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-6 top-4 text-(--muted-text) hover:text-white"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-400 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-(--primary) hover:bg-[var(--primary-hover)] disabled:opacity-70 transition-all text-black font-semibold py-4 rounded-2xl text-lg active:scale-[0.985]"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
