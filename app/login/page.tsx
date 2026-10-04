"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    // ===== NEW CHANGE: Login form state =====
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // ===== NEW CHANGE: Error and loading state =====
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ===== NEW CHANGE: Static login =====
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        // ===== Static username/password =====
        if (username === "username" && password === "password") {
            setLoading(true);

            // ===== NEW CHANGE: Store login status =====
            localStorage.setItem("isLoggedIn", "true");

            // ===== NEW CHANGE: Redirect to dashboard =====
            router.push("/dashboard");

            return;
        }

        // ===== Invalid login =====
        setError("Invalid username or password.");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* ========================================= */}
                {/* LOGIN CARD */}
                {/* ========================================= */}

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

                    {/* LOGO / TITLE */}

                    <div className="text-center mb-8">

                        <div className="
              mx-auto
              w-14
              h-14
              rounded-xl
              bg-blue-600
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-xl
            ">
                            FM
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            Fleet Management
                        </h1>

                        <p className="text-sm text-slate-500 mt-1">
                            Sign in to your account
                        </p>

                    </div>

                    {/* ========================================= */}
                    {/* ERROR MESSAGE */}
                    {/* ========================================= */}

                    {error && (
                        <div className="
              mb-5
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-700
            ">
                            {error}
                        </div>
                    )}

                    {/* ========================================= */}
                    {/* LOGIN FORM */}
                    {/* ========================================= */}

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* USERNAME */}

                        <div>

                            <label
                                htmlFor="username"
                                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                autoComplete="username"
                                className="
                  w-full
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  border
                  border-slate-300
                  rounded-lg
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
                            />

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label
                                htmlFor="password"
                                className="
                  block
                  text-sm
                  font-medium
                  text-slate-700
                  mb-2
                "
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoComplete="current-password"
                                className="
                  w-full
                  bg-white
                  text-slate-900
                  placeholder:text-slate-400
                  border
                  border-slate-300
                  rounded-lg
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
                            />

                        </div>

                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                py-3
                rounded-lg
                font-semibold
                transition
              "
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                    {/* ========================================= */}
                    {/* DEMO CREDENTIALS */}
                    {/* ========================================= */}

                    <div className="
            mt-6
            rounded-lg
            bg-slate-50
            border
            border-slate-200
            p-4
            text-sm
          ">

                        <p className="font-medium text-slate-700 mb-2">
                            Demo Login
                        </p>

                        <p className="text-slate-500">
                            Username:{" "}
                            <span className="font-medium text-slate-700">
                                username
                            </span>
                        </p>

                        <p className="text-slate-500">
                            Password:{" "}
                            <span className="font-medium text-slate-700">
                                password
                            </span>
                        </p>

                    </div>

                </div>

                {/* FOOTER */}

                <p className="text-center text-xs text-slate-400 mt-6">
                    © {new Date().getFullYear()} Fleet Management
                </p>

            </div>

        </div>
    );
}