"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

type LoginResponse = {
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name?: string | null;
    };
  };
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/orders");
    }
  }, [isAuthenticated, isInitialized, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message ?? "Failed to login");
        return;
      }

      const { data } = result as LoginResponse;

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(
        setCredentials({
          token: data.token,
          user: data.user,
        }),
      );

      router.push("/orders");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 mb-3">Login</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    placeholder="Enter email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter password"
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-success w-100" type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-muted small mt-3 mb-0">
                Demo account: admin@example.com / password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
