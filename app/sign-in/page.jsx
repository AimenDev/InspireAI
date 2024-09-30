"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Updated import

const Login = () => {
  const [providers, setProviders] = useState(null);
  const router = useRouter(); // Initialize useRouter from next/navigation

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignIn = async (providerId) => {
    const res = await signIn(providerId, { redirect: false }); // Disable automatic redirect
    if (res.ok) {
      router.push("/"); // Redirect to home page on successful sign-in
    } else {
      console.error("Sign in failed", res.error); // Handle any errors
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <div className="flex flex-col gap-4">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleSignIn(provider.id)} // Call handleSignIn with provider ID
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 ${
                provider.name === "Google"
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-slate-800"
              }`}
            >
              {provider.name === "Google" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4285F4"
                    d="M44.5 20H24v8.5h11.7c-1.6 4.6-5.9 7.8-11.7 7.8-6.9 0-12.5-5.6-12.5-12.5S17.1 11.3 24 11.3c3.1 0 6 .9 8.3 2.7l6.3-6.3C34.9 4.6 29.8 2.5 24 2.5 12.5 2.5 3.5 11.5 3.5 23S12.5 43.5 24 43.5c10.8 0 19.9-8 19.9-19.9 0-1.6-.2-3.2-.4-4.6z"
                  />
                  <path
                    fill="#34A853"
                    d="M6.2 14.6l6.9 5.1C14.8 16.7 18.9 14 24 14c3.1 0 6 .9 8.3 2.7l6.3-6.3C34.9 4.6 29.8 2.5 24 2.5 16.1 2.5 9.1 7.3 6.2 14.6z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M24 44.5c5.8 0 10.9-2.1 14.8-5.6l-6.9-5.2c-2.3 1.8-5.2 2.8-8.3 2.8-5.7 0-10.6-3.8-12.3-8.9l-7 5.4c3.1 6.3 9.4 10.6 16.7 10.6z"
                  />
                </svg>
              )}
              {provider.name === "GitHub" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.7.6-3.3-1.3-3.3-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.2-.3-4.5-1.1-4.5-5a3.8 3.8 0 0 1 1-2.7 3.5 3.5 0 0 1 .1-2.7s1-.3 3.4 1.3a11 11 0 0 1 6.1 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.3 3 .1 3.4a3.8 3.8 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 4.9.4.4.7 1 .7 2v3c0 .2.3.6.7.5A10 10 0 0 0 12 2z" />
                </svg>
              )}
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Login;
