import React from 'react'
import InterviewList from './InterviewList'
import { Link } from 'lucide-react'
import { useRouter } from 'next/router';

function InterviewItemCard({ interview }) {

    const router=useRouter();
   
    const onStart=()=>{
    router.push('/dashboard/interview/'+interview?.mockId)
 
    }
        const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+"/feedback")
    }
    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-500'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-grey-500'>Created At:{interview.createdAt}</h2>

            <div className='flex justify-between mt-2 gap-5'>
            
        <Buttton size="sm" variant="outline" className="w-full" 
        onclick={onFeedback}
                >Feedback</Buttton>
            
            <Button size="sm" className="w-full" onclick={onStart}>
                Start</Button>
        </div>
    </div >
  )
}

export default InterviewItemCard

