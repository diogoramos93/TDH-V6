import React, { createContext, useContext, useState } from 'react';
import { TestState } from '../types';
import { StatsService } from '../services/stats';
import { QUESTIONS } from '../constants';

interface TestContextType extends TestState {
  setAnswer: (questionId: number, value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  markPaid: () => void;
  resetTest: () => void;
}

const defaultState: TestState = {
  answers: {},
  isComplete: false,
  hasPaid: false,
  currentQuestionIndex: 0,
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<TestState>(defaultState);

  const setAnswer = (questionId: number, value: number) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value }
    }));
  };

  const nextQuestion = () => {
    setState(prev => {
      // Prevent going out of bounds
      if (prev.currentQuestionIndex >= QUESTIONS.length - 1) {
        return prev;
      }
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      };
    });
  };

  const prevQuestion = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  };

  const resetTest = () => {
    setState(defaultState);
    // Track start in "Database"
    StatsService.trackStart();
  };

  const markPaid = () => {
    setState(prev => ({ ...prev, hasPaid: true }));
    // Track sale in "Database"
    StatsService.trackSale();
  };

  return (
    <TestContext.Provider value={{ ...state, setAnswer, nextQuestion, prevQuestion, resetTest, markPaid }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) throw new Error("useTest must be used within TestProvider");
  return context;
};