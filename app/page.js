"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    // If user is already signed in, redirect to dashboard
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          AI Mock Interviewer
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Practice your interview skills with AI-powered mock interviews. Get
          personalized feedback and improve your confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGetStarted}
            className="px-8 py-3 text-lg"
            size="lg"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started"}
          </Button>

          {!isSignedIn && (
            <Button
              onClick={() => router.push("/sign-up")}
              variant="outline"
              className="px-8 py-3 text-lg"
              size="lg"
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
