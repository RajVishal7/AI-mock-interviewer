"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
// import { GoogleGenerativeAI } from "@google/generative-ai";
 
import { useRouter } from 'next/navigation';

 

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
 

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const questionCount = Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 5;

    const res = await fetch('/api/generate-interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobPosition,
        jobDesc,
        jobExperience,
        questionCount,
      }),
    });

   
    const data = await res.json();
     console.log("data in vishal",data)
    if (!data.success) {
      throw new Error(data.error || 'Unknown error');
    }

    const parsedResponse = data.questions;

    // Save to database
    const resp = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsedResponse),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    if (resp && resp[0]?.mockId) {
      setOpenDialog(false);
      router.push("/dashboard/interview/" + resp[0]?.mockId);
    } else {
      alert("Error: Failed to save interview to database.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Add Mock Interview Details
            </DialogTitle>
            <DialogDescription>
              Fill in your job role, description, and experience to generate questions.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="mt-7 my-2 w-full max-w-md">
              <label htmlFor="jobPosition" className="block mb-1 font-medium">
                Job Role/Position
              </label>
              <Input
                id="jobPosition"
                placeholder="Ex. Frontend Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            <div className="my-3 w-full max-w-md">
              <label htmlFor="jobDescription" className="block mb-1 font-medium">
                Job Description / Tech Stack
              </label>
              <Input
                id="jobDescription"
                placeholder="Ex. React, Node, MongoDB"
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div className="my-3 w-full max-w-md">
              <label htmlFor="jobExperience" className="block mb-1 font-medium">
                Years of Experience
              </label>
              <Input
                id="jobExperience"
                placeholder="Ex. 2"
                type="number"
                min="0"
                max="50"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button
                type="button"
                onClick={() => setOpenDialog(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    Generating...
                  </>
                ) : (
                  "Start Interview"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
