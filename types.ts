export enum AnswerValue {
  NUNCA = 0,
  RARAMENTE = 1,
  AS_VEZES = 2,
  FREQUENTEMENTE = 3,
  SEMPRE = 4
}

export interface Question {
  id: number;
  text: string;
  category: string;
}

export interface TestState {
  answers: Record<number, number>;
  isComplete: boolean;
  hasPaid: boolean;
  currentQuestionIndex: number;
  externalId?: string; // ID from backend
}

export enum ResultCategory {
  BAIXA = 'Baixa',
  MODERADA = 'Moderada',
  ALTA = 'Alta',
  MUITO_ALTA = 'Muito Alta'
}

export interface ScoreResult {
  totalScore: number;
  category: ResultCategory;
  categoryText: string;
  categoryColor: string;
  sectionScores: { name: string; score: number; max: number }[];
}

// Content Types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for simplicity
  keywords: string[];
}

export interface StaticPage {
  slug: string;
  title: string;
  description: string;
  content: string;
  keywords: string[];
}

// Admin Types
export interface AdminSettings {
  mp_access_token: string;
  price: string;
}

export interface SaleRecord {
  id: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
  category: string;
}

export interface DashboardStats {
  testsStarted: number;
  testsCompleted: number;
  salesCount: number;
  totalRevenue: number;
}