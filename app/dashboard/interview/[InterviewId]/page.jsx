"use client";

import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    if (params?.InterviewId) {
      console.log("Interview ID from URL:", params.InterviewId);
      getInterviewDetails(params.InterviewId);
    }
  }, [params?.InterviewId]);

  const getInterviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));

      if (result?.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.error("Interview not found");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 p-5 rounded-lg border">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData?.jobRole || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong>{" "}
              {interviewData?.techStack || "Loading..."}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong>{" "}
              {interviewData?.experience || "Loading..."}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-200">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Prepare well, keep your environment quiet, and stay confident during the mock interview."}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300, borderRadius: "12px" }}
            />
          ) : (
            <>
              <WebcamIcon className="h-40 w-40 my-7 p-5 bg-secondary rounded-2xl" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebcamEnabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <Link href={`/dashboard/interview/${params?.InterviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
