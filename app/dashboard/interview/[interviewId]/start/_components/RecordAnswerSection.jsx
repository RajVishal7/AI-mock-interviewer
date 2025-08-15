"use client";

import { Button } from "@/components/ui/button";
import { WebcamIcon, Mic, StopCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import Webcam from "react-webcam";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results && results.length > 0) {
      const latestTranscript = results[results.length - 1]?.transcript || "";
      setUserAnswer((prevAns) => prevAns + latestTranscript + " ");
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      const callUpdate = async () => {
        try {
          await updateUserAnswer();
        } catch (error) {
          console.error(error);
        }
      };
      callUpdate();
    }
  }, [userAnswer, isRecording]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);

    try {
      // Generate feedback using API route
      const feedbackResponse = await fetch("/api/generate-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          userAnswer: userAnswer,
          correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
        }),
      });

      const feedbackResult = await feedbackResponse.json();

      let feedbackData = { rating: "5", feedback: "No feedback available" };

      if (feedbackResult.success) {
        feedbackData = feedbackResult.feedback;
      }

      // Save to database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: feedbackData?.feedback,
        rating: feedbackData?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY HH:mm:ss"),
      });

      if (resp) {
        toast.success("User answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast.error("Error saving user answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src="/WEB CAMERA.png"
          width={200}
          height={200}
          alt="Webcam Placeholder"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
