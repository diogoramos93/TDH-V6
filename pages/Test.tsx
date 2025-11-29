import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { QUESTIONS } from '../constants';
import { AnswerValue } from '../types';

export const TestPage = () => {
  const navigate = useNavigate();
  const { currentQuestionIndex, answers, setAnswer, nextQuestion, prevQuestion } = useTest();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;

  // Scroll to top on question change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsTransitioning(false); // Reset lock on new question
  }, [currentQuestionIndex]);

  // Safety Guard: If index is out of bounds, redirect or show nothing
  useEffect(() => {
    if (!currentQuestion) {
      if (currentQuestionIndex >= QUESTIONS.length) {
        navigate('/result-free');
      } else {
        navigate('/');
      }
    }
  }, [currentQuestion, currentQuestionIndex, navigate]);

  if (!currentQuestion) {
    return null; // Render nothing while redirecting
  }

  const handleOptionSelect = (val: number) => {
    if (isTransitioning) return; // Prevent double clicks
    setIsTransitioning(true);

    setAnswer(currentQuestion.id, val);
    
    // Small delay for better UX
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        nextQuestion();
      } else {
        navigate('/result-free');
      }
    }, 250);
  };

  const OPTIONS = [
    { value: AnswerValue.NUNCA, label: "Nunca" },
    { value: AnswerValue.RARAMENTE, label: "Raramente" },
    { value: AnswerValue.AS_VEZES, label: "Às vezes" },
    { value: AnswerValue.FREQUENTEMENTE, label: "Frequentemente" },
    { value: AnswerValue.SEMPRE, label: "Sempre" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Questão {currentQuestionIndex + 1} de {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% Concluído</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleOptionSelect(opt.value)}
              disabled={isTransitioning}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                ${isTransitioning ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                ${answers[currentQuestion.id] === opt.value 
                  ? 'border-blue-600 bg-blue-50 text-blue-700' 
                  : 'border-slate-100 hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                }`}
            >
              <span className="font-medium text-lg">{opt.label}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${answers[currentQuestion.id] === opt.value 
                  ? 'border-blue-600' 
                  : 'border-slate-300 group-hover:border-blue-400'
                }`}>
                {answers[currentQuestion.id] === opt.value && (
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0 || isTransitioning}
          className={`px-6 py-2 rounded-lg text-slate-600 font-medium transition-colors
            ${currentQuestionIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-slate-100'}`}
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
};