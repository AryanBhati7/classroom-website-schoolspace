import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Logo } from "../components/index.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth.hook.js";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: loginUser, isPending } = useLogin();

  const onSubmit = async (data) => {
    const res = await loginUser(data);

    if (res) {
      console.log("User logged in successfully");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Logo className={"mb-3"} />
        <h2 className="text-2xl font-bold mb-4 text-left">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-3 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            <div
              className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-xl leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 cursor-pointer" />
              ) : (
                <FaEye className="text-gray-500 cursor-pointer" />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-gray-600 text-md mt-4 text-center">
          If you are a student or teacher, kindly ask your{" "}
          <b>Principal/System Administrator </b>
          for Sign-in credentials.
        </p>
        <p className="text-gray-600 text-md mt-4 text-center">
          If you are a Principal/System Administrator, create an Account by{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 underline hover:text-blue-700"
          >
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default SignIn;
