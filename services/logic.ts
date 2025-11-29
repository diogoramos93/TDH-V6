import { QUESTIONS, RESULT_TEXTS } from "../constants";
import { ResultCategory, ScoreResult } from "../types";

export const calculateScore = (answers: Record<number, number>): ScoreResult => {
  let totalScore = 0;
  const sectionScores: Record<string, { current: number; max: number }> = {};

  QUESTIONS.forEach((q) => {
    const val = answers[q.id] || 0;
    totalScore += val;

    if (!sectionScores[q.category]) {
      sectionScores[q.category] = { current: 0, max: 0 };
    }
    sectionScores[q.category].current += val;
    sectionScores[q.category].max += 4; // Max value per question
  });

  let category = ResultCategory.BAIXA;

  if (totalScore >= 144) category = ResultCategory.MUITO_ALTA;
  else if (totalScore >= 101) category = ResultCategory.ALTA;
  else if (totalScore >= 61) category = ResultCategory.MODERADA;
  else category = ResultCategory.BAIXA;

  const resultMeta = RESULT_TEXTS[category];

  return {
    totalScore,
    category,
    categoryText: resultMeta.title,
    categoryColor: resultMeta.color,
    sectionScores: Object.entries(sectionScores).map(([name, scores]) => ({
      name,
      score: scores.current,
      max: scores.max
    }))
  };
};