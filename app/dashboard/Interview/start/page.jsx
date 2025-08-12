"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Link } from 'lucide-react';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuesionIndex, setActiveQuestionsIndex] = useState(0);

    useEffect(() => {
        getInterviewDetails();
    }, []);

    const getInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interview));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                console.log(jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            } else {
                console.error('No interview found for this ID.');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <QuestionSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuesionIndex={activeQuesionIndex}
            />
            <RecordAnswerSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuesionIndex={activeQuesionIndex}
                interviewData={interviewData}
            />



            <div className='flex justify-end gap-6'>
                {activeQuesionIndex > 0 &&
                    <Button onclick={()=>setActiveQuestionsIndex(activeQuesionIndex-1)}>Previous Questions</Button>}
                {activeQuesionIndex != mockInterviewQuestion?.length - 1 &&
                    <Button onclick={()=>setActiveQuestionsIndex(activeQuesionIndex+1)}>Next Question</Button>}


                {activeQuesionIndex == mockInterviewQuestion?.length - 1 &&
                <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                    <Button>End Interview</Button>
                    </Link>}
            </div>
        </div>
    );
}

export default StartInterview;
