import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Logo } from "../components/index.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin, useRegisterUser } from "../hooks/auth.hook.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice.js";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  organization: z.string().min(1, "Organization Name is required"),
});

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: registerUser, isPending } = useRegisterUser();

  const { mutateAsync: loginUser } = useLogin();
  const onSubmit = async (data) => {
    const res = await registerUser(data);
    console.log(res);

    if (res) {
      dispatch(setUser(res));
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Logo className={"mb-3"} />
        <h2 className="text-2xl font-bold mb-4 text-left">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
          <div className="mb-3">
            <label className="block text-gray-700">Organization Name</label>
            <input
              type="text"
              {...register("organization")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.organization && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organization.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 font-semibold text-white p-2 rounded mt-4 hover:bg-blue-700"
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
