"use client";

import { useEffect, useState } from "react";

export default function ClerkTest() {
  const [clerkStatus, setClerkStatus] = useState("Loading...");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if Clerk is properly loaded
    const checkClerk = async () => {
      try {
        // Wait a bit for Clerk to load
        setTimeout(() => {
          if (window.Clerk) {
            setClerkStatus("Clerk is loaded and available");
          } else {
            setClerkStatus("Clerk is not available on window object");
          }
        }, 2000);
      } catch (error) {
        setClerkStatus(`Error: ${error.message}`);
      }
    };

    checkClerk();
  }, []);

  if (!isClient) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded m-4">
        <h3 className="font-bold text-red-800">Clerk Test Status</h3>
        <p className="text-red-700">Loading...</p>
        <p className="text-sm text-red-600 mt-2">
          Publishable Key:{" "}
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
            ? "Present"
            : "Missing"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-100 border border-red-400 rounded m-4">
      <h3 className="font-bold text-red-800">Clerk Test Status</h3>
      <p className="text-red-700">{clerkStatus}</p>
      <p className="text-sm text-red-600 mt-2">
        Publishable Key:{" "}
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "Present" : "Missing"}
      </p>
    </div>
  );
}
