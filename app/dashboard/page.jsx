"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not signed in, don't render anything (user will be redirected)
  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Welcome back, {user?.firstName}! Create and start your AI Mock Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/*Previous Interview List*/}
      <InterviewList />
    </div>
  );
}

export default Dashboard;
