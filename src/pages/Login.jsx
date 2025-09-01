import { useState } from "react";
import API from "../api/axios";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log({ email, password });
    setError("");

    try {
      const res = await API.post(
        "/auth/login",
        { email, password }
      );

      // Save token & user in localStorage (or context)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"></div>
          <span className="text-2xl font-bold gradient-text text-emerald-800">
            Reimaging Future
          </span>
        </div>

        <div className="shadow-medium flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center py-0">Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-10 items-center mt-3 justify-center space-y-4 p-6 bg-white rounded-lg shadow-md"
        >
          <div className="space-y-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full text-1xl hover:bg-blue-800 rounded-md text-white bg-emerald-900 py-2"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?
            <span className="ml-2 text-emerald-900 cursor-pointer hover:bg-green-900 hover:text-white hover:rounded-md hover:shadow-lg">
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
