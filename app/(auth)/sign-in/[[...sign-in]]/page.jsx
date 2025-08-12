"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left Side Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=987&q=80"
            alt="Sign In"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Google SignIn only */}
        <div className="p-8 sm:p-12 flex items-center justify-center">
      
         <SignIn
  signUpUrl="/sign-up"
  forceRedirectUrl="/dashboard"  
/>

        </div>
      </div>
    </div>
  );
}

 


