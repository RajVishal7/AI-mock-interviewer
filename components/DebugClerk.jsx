"use client";

import { useUser, useClerk } from "@clerk/nextjs";

export default function DebugClerk() {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-2">Clerk Debug Information</h3>
      <div className="space-y-2 text-sm">
        <p>
          <strong>Is Loaded:</strong> {String(isLoaded)}
        </p>
        <p>
          <strong>Is Signed In:</strong> {String(isSignedIn)}
        </p>
        <p>
          <strong>User ID:</strong> {user?.id || "None"}
        </p>
        <p>
          <strong>User Email:</strong>{" "}
          {user?.emailAddresses?.[0]?.emailAddress || "None"}
        </p>
        <p>
          <strong>User First Name:</strong> {user?.firstName || "None"}
        </p>
        <p>
          <strong>Clerk Loaded:</strong> {String(!!clerk)}
        </p>
        <p>
          <strong>Environment:</strong> {process.env.NODE_ENV}
        </p>
        <p>
          <strong>Has Publishable Key:</strong>{" "}
          {String(!!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)}
        </p>
      </div>
    </div>
  );
}
