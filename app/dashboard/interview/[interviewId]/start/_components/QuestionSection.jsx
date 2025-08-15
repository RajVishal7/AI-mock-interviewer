import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  onQuestionClick,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech");
    }
  };

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="p-5 border rounded-lg my-10">
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading questions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (
    activeQuestionIndex >= mockInterviewQuestion.length ||
    activeQuestionIndex < 0
  ) {
    return (
      <div className="p-5 border rounded-lg my-10">
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <p className="text-red-600">Error: Question not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer transition-colors ${
              activeQuestionIndex === index
                ? "bg-primary text-white"
                : "hover:bg-gray-300"
            }`}
            onClick={() => onQuestionClick && onQuestionClick(index)}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question ||
          "Question not available"}
      </h2>

      <Volume2
        className="cursor-pointer hover:text-primary transition-colors"
        onClick={() => {
          const question = mockInterviewQuestion[activeQuestionIndex]?.question;
          if (question) {
            textToSpeech(question);
          }
        }}
      />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          Click the microphone to record your answer. Speak clearly and take
          your time.
        </h2>
      </div>
    </div>
  );
}

export default QuestionSection;
