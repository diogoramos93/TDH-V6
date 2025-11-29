import { Question, ResultCategory } from "./types";

const CAT_ATENCAO = "Atenção";
const CAT_IMPULSIVIDADE = "Impulsividade";
const CAT_ORGANIZACAO = "Organização";
const CAT_MEMORIA = "Memória de Trabalho";
const CAT_EMOCIONAL = "Controle Emocional";

// Mapeamento exato das 48 perguntas solicitadas
export const QUESTIONS: Question[] = [
  { id: 1, text: "Você se distrai facilmente com detalhes?", category: CAT_ATENCAO },
  { id: 2, text: "Tem dificuldade em manter a atenção em tarefas longas?", category: CAT_ATENCAO },
  { id: 3, text: "Evita tarefas que exigem esforço mental prolongado?", category: CAT_ATENCAO },
  { id: 4, text: "Costuma perder objetos importantes?", category: CAT_ORGANIZACAO },
  { id: 5, text: "Tem dificuldade em seguir instruções até o fim?", category: CAT_ATENCAO },
  { id: 6, text: "Procrastina tarefas simples?", category: CAT_ATENCAO },
  { id: 7, text: "Esquece prazos frequentemente?", category: CAT_MEMORIA },
  { id: 8, text: "Sente inquietação constante?", category: CAT_IMPULSIVIDADE },
  { id: 9, text: "Fica impaciente esperando sua vez?", category: CAT_IMPULSIVIDADE },
  { id: 10, text: "Interrompe conversas?", category: CAT_IMPULSIVIDADE },
  { id: 11, text: "Toma decisões impulsivas?", category: CAT_IMPULSIVIDADE },
  { id: 12, text: "Fala demais?", category: CAT_IMPULSIVIDADE },
  { id: 13, text: "Se sente sobrecarregado por tarefas simples?", category: CAT_EMOCIONAL },
  { id: 14, text: "Se distrai durante conversas?", category: CAT_ATENCAO },
  { id: 15, text: "Tem dificuldade em organizar tarefas?", category: CAT_ORGANIZACAO },
  { id: 16, text: "Começa projetos e não termina?", category: CAT_ATENCAO },
  { id: 17, text: "Entra em hiperfoco?", category: CAT_ATENCAO },
  { id: 18, text: "Esquece onde colocou coisas?", category: CAT_MEMORIA },
  { id: 19, text: "Fica ansioso com tarefas múltiplas?", category: CAT_EMOCIONAL },
  { id: 20, text: "Abandona atividades quando ficam difíceis?", category: CAT_EMOCIONAL },
  { id: 21, text: "Irrita-se facilmente?", category: CAT_EMOCIONAL },
  { id: 22, text: "Sente dificuldade para iniciar tarefas?", category: CAT_ATENCAO },
  { id: 23, text: "Perde noção do tempo?", category: CAT_ORGANIZACAO },
  { id: 24, text: "Age sem pensar?", category: CAT_IMPULSIVIDADE },
  { id: 25, text: "Tem dificuldade em manter organização?", category: CAT_ORGANIZACAO },
  { id: 26, text: "Se distrai com barulhos?", category: CAT_ATENCAO },
  { id: 27, text: "Evita tarefas chatas?", category: CAT_ATENCAO },
  { id: 28, text: "Se sente mentalmente desorganizado?", category: CAT_ORGANIZACAO },
  { id: 29, text: "Perde foco em reuniões?", category: CAT_ATENCAO },
  { id: 30, text: "Muda de assunto rápido?", category: CAT_ATENCAO },
  { id: 31, text: "Sente inquietação mesmo sentado?", category: CAT_IMPULSIVIDADE },
  { id: 32, text: "A mente “não desliga”?", category: CAT_IMPULSIVIDADE },
  { id: 33, text: "Tem explosões emocionais?", category: CAT_EMOCIONAL },
  { id: 34, text: "Interrompe pessoas sem perceber?", category: CAT_IMPULSIVIDADE },
  { id: 35, text: "Travamento para tomar decisões?", category: CAT_ORGANIZACAO },
  { id: 36, text: "Esquece coisas recém ditas?", category: CAT_MEMORIA },
  { id: 37, text: "Perde foco ao ler?", category: CAT_ATENCAO },
  { id: 38, text: "Dificuldade em manter rotinas?", category: CAT_ORGANIZACAO },
  { id: 39, text: "Faz tudo correndo?", category: CAT_IMPULSIVIDADE },
  { id: 40, text: "Subestima tempo das tarefas?", category: CAT_ORGANIZACAO },
  { id: 41, text: "Sente que não termina nada?", category: CAT_ORGANIZACAO },
  { id: 42, text: "Dificuldade para priorizar?", category: CAT_ORGANIZACAO },
  { id: 43, text: "Se entedia facilmente?", category: CAT_ATENCAO },
  { id: 44, text: "Começa várias coisas ao mesmo tempo?", category: CAT_IMPULSIVIDADE },
  { id: 45, text: "Dificuldade em relacionamentos por desatenção?", category: CAT_EMOCIONAL },
  { id: 46, text: "Problemas por impulsividade?", category: CAT_IMPULSIVIDADE },
  { id: 47, text: "Vive “no automático”?", category: CAT_ATENCAO },
  { id: 48, text: "Perde energia rápido mentalmente?", category: CAT_ATENCAO },
];

export const RESULT_TEXTS = {
  [ResultCategory.BAIXA]: {
    title: "Baixa Tendência",
    description: "Seu resultado indica baixa tendência aos sintomas característicos de TDAH na vida adulta. Embora todos apresentem distração ou impulsividade ocasionalmente, seus padrões não sugerem risco significativo.",
    color: "text-green-600",
    bg: "bg-green-100",
    border: "border-green-500"
  },
  [ResultCategory.MODERADA]: {
    title: "Tendência Moderada",
    description: "Você apresenta sinais relevantes em atenção, organização ou impulsividade. Não significa diagnóstico, mas sugere que investigar mais a fundo pode ser útil.",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    border: "border-yellow-500"
  },
  [ResultCategory.ALTA]: {
    title: "Tendência Alta",
    description: "Seu resultado mostra presença acentuada de sintomas relacionados ao TDAH. Isso não é diagnóstico clínico, mas seu padrão é compatível com o perfil de adultos que buscam avaliação profissional.",
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-500"
  },
  [ResultCategory.MUITO_ALTA]: {
    title: "Tendência Muito Alta",
    description: "Há forte indicativo de sintomas persistentes e significativos em múltiplas áreas — atenção, impulsividade, organização e controle emocional.",
    color: "text-red-600",
    bg: "bg-red-100",
    border: "border-red-600"
  }
};

export const PRICING = {
  amount: 29.90,
  pixKey: "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540529.905802BR5913FOCUSCHECK6008SAOPAULO62070503***6304C1CA"
};