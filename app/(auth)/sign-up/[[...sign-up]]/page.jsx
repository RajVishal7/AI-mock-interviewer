"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1560472355-a9a3c8c70b94?auto=format&fit=crop&w=987&q=80"
            alt="Sign Up"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="p-8 sm:p-12 flex items-center justify-center">
          <SignUp signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}
