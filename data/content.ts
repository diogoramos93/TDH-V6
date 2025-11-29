import { BlogPost, StaticPage } from "../types";

export const STATIC_PAGES: Record<string, StaticPage> = {
  "tdah-sintomas": {
    slug: "tdah-sintomas",
    title: "Sintomas de TDAH em Adultos: Guia Completo e Exemplos Reais",
    description: "Descubra os principais sintomas do TDAH em adultos. Entenda como a desatenção, impulsividade e hiperatividade se manifestam na vida adulta.",
    keywords: ["sintomas tdah adulto", "tdah desatenção", "hiperatividade adulto", "impulsividade", "sinais tdah"],
    content: `
      <h2>Os 3 Pilares do TDAH no Adulto</h2>
      <p>O Transtorno de Déficit de Atenção e Hiperatividade (TDAH) em adultos se manifesta de forma diferente do que em crianças. Enquanto crianças costumam ser agitadas fisicamente, adultos tendem a ter uma agitação mental constante.</p>
      
      <h3>1. Desatenção</h3>
      <p>Não é apenas "não prestar atenção". É uma dificuldade em <strong>regular</strong> a atenção. Adultos com TDAH podem:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Perder o fio da meada em conversas longas.</li>
        <li>Cometer erros por descuido no trabalho.</li>
        <li>Esquecer pagamentos e prazos importantes constantemente.</li>
      </ul>

      <h3>2. Hiperatividade e Impulsividade</h3>
      <p>A hiperatividade no adulto muitas vezes vira uma inquietude interna. Você pode sentir que sua "mente nunca desliga". A impulsividade aparece em:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Interromper os outros durante falas.</li>
        <li>Gastos financeiros impulsivos.</li>
        <li>Mudanças repentinas de planos ou empregos.</li>
      </ul>

      <h3>3. Disfunção Executiva</h3>
      <p>Talvez o sintoma mais impactante. É a dificuldade do cérebro em planejar, priorizar e executar.</p>
      <ul class="list-disc pl-6 mb-4">
        <li>"Paralisia" diante de tarefas simples.</li>
        <li>Dificuldade enorme em começar (procrastinação crônica).</li>
        <li>Perda frequente da noção do tempo (cegueira temporal).</li>
      </ul>

      <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
        <h4 class="font-bold text-blue-900 mb-2">Você se identifica?</h4>
        <p class="text-blue-800">Muitos adultos passam a vida achando que são apenas "preguiçosos" ou "desorganizados". O diagnóstico pode ser libertador. Faça nosso teste indicativo gratuito para entender seu perfil.</p>
      </div>
    `
  },
  "tdah-o-que-e": {
    slug: "tdah-o-que-e",
    title: "O que é TDAH? Entenda o Transtorno e seus Subtipos",
    description: "Saiba o que é o TDAH, como funciona o cérebro neurodivergente e quais são os subtipos diagnosticados clinicamente.",
    keywords: ["o que é tdah", "tipos de tdah", "tdah combinado", "neurodivergência"],
    content: `
      <h2>Definição Clínica</h2>
      <p>O TDAH é um transtorno do neurodesenvolvimento que afeta a regulação da dopamina no cérebro, impactando funções executivas como controle inibitório e memória de trabalho.</p>

      <h3>Os Subtipos de TDAH</h3>
      <p>Antigamente chamado apenas de DDA (para desatenção), hoje o DSM-5 classifica o TDAH em três apresentações principais:</p>
      
      <div class="grid md:grid-cols-3 gap-4 my-6">
        <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h4 class="font-bold text-slate-800">Predominantemente Desatento</h4>
          <p class="text-sm text-slate-600 mt-2">Maior dificuldade em foco, organização e detalhes. Menos agitação física.</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h4 class="font-bold text-slate-800">Predominantemente Hiperativo</h4>
          <p class="text-sm text-slate-600 mt-2">Inquietação constante, fala excessiva, dificuldade em esperar.</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <h4 class="font-bold text-slate-800">Combinado</h4>
          <p class="text-sm text-slate-600 mt-2">O tipo mais comum, apresentando critérios tanto de desatenção quanto de impulsividade.</p>
        </div>
      </div>

      <h3>Como funciona o Diagnóstico?</h3>
      <p>Não existe um exame de sangue ou ressonância que detecte o TDAH. O diagnóstico é <strong>clínico</strong>, feito por psiquiatras ou neurologistas baseados em:</p>
      <ul class="list-decimal pl-6 mb-4">
        <li>Histórico de vida (sintomas presentes desde a infância).</li>
        <li>Entrevistas com familiares.</li>
        <li>Escalas de avaliação (como a que usamos em nosso teste indicativo).</li>
        <li>Exclusão de outros transtornos (como ansiedade ou bipolaridade).</li>
      </ul>
    `
  },
  "tdah-trabalho": {
    slug: "tdah-trabalho",
    title: "TDAH no Trabalho: Desafios, Sinais e Estratégias de Sobrevivência",
    description: "Como o TDAH afeta a vida profissional? Veja dicas para lidar com prazos, reuniões e produtividade no ambiente corporativo.",
    keywords: ["tdah no trabalho", "produtividade tdah", "foco no trabalho", "carreira tdah"],
    content: `
      <h2>O Desafio Corporativo</h2>
      <p>O ambiente de trabalho moderno, com exigências de multitarefa, prazos rígidos e escritórios barulhentos (open offices), pode ser extremamente hostil para o cérebro TDAH.</p>

      <h3>Sinais comuns no trabalho</h3>
      <ul class="list-disc pl-6 mb-4">
        <li><strong>Procrastinação de e-mails:</strong> Acumular centenas de mensagens não lidas.</li>
        <li><strong>Reuniões:</strong> Dificuldade em manter o foco após 10 minutos, rabiscando ou mexendo no celular.</li>
        <li><strong>Prazos:</strong> Entregar tudo na última hora, dependendo da adrenalina do pânico para focar.</li>
        <li><strong>Erros bobos:</strong> Esquecer anexos em e-mails ou errar datas em planilhas.</li>
      </ul>

      <h3>Estratégias Práticas</h3>
      
      <h4>1. Externalize a Memória</h4>
      <p>Não confie no seu cérebro para guardar datas. Se não está na agenda, não existe. Use blocos de notas físicos para capturar ideias voláteis durante reuniões.</p>

      <h4>2. Técnica Pomodoro Modificada</h4>
      <p>Trabalhe por blocos de tempo. Se 25 minutos é muito, tente 15. O importante é ter um timer visual.</p>

      <h4>3. Body Doubling (Dublê de Corpo)</h4>
      <p>Trabalhar com alguém ao lado (mesmo que em silêncio) ajuda a manter o foco e reduzir a vontade de procrastinar.</p>
    `
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "7-sinais-tdah-adultos-ignoram",
    title: "7 sinais de TDAH que adultos ignoram",
    excerpt: "Muitos adultos vivem sem diagnóstico acreditando que seus sintomas são apenas traços de personalidade. Veja o que observar.",
    keywords: ["sinais tdah", "sintomas ocultos", "tdah não diagnosticado"],
    content: `
      <p>O TDAH não é apenas sobre não conseguir ficar sentado. Em adultos, ele se esconde em comportamentos sutis:</p>
      <ol class="list-decimal pl-6 space-y-4">
        <li><strong>Cegueira de Tempo:</strong> Você constantemente subestima quanto tempo leva para se arrumar e sai atrasado.</li>
        <li><strong>Dificuldade em manter hobbies:</strong> Você tem um "cemitério" de hobbies iniciados e abandonados (violão, pintura, programação).</li>
        <li><strong>Sensibilidade à Rejeição (RSD):</strong> Uma crítica pequena no trabalho parece o fim do mundo para você.</li>
        <li><strong>Desorganização Financeira:</strong> Pagar juros por esquecer boletos, mesmo tendo dinheiro na conta.</li>
        <li><strong>Interrupção de fala:</strong> Você completa as frases dos outros porque "já sabe" o que vão dizer.</li>
        <li><strong>Hiperfoco seletivo:</strong> Passar 8 horas jogando videogame, mas não conseguir ler 1 página de um relatório.</li>
        <li><strong>Exaustão mental:</strong> Sentir-se drenado após tarefas simples do dia a dia, como ir ao mercado.</li>
      </ol>
      <p class="mt-4">Se você marcou "sim" para a maioria, considere fazer nosso <a href='/test' class='text-blue-600 underline'>teste gratuito</a>.</p>
    `
  },
  {
    slug: "tdah-e-procrastinacao",
    title: "TDAH e procrastinação: Por que você não consegue começar?",
    excerpt: "A procrastinação no TDAH não é preguiça. É uma falha na função executiva. Entenda a ciência por trás.",
    keywords: ["procrastinação", "disfunção executiva", "preguiça vs tdah"],
    content: `
      <p>Para um neurotípico, começar uma tarefa exige um pouco de esforço. Para alguém com TDAH, exige uma montanha de dopamina que o cérebro não tem.</p>
      <h3>O Muro da Iniciação</h3>
      <p>Chamamos de "Muro da Iniciação" a barreira invisível que impede você de lavar a louça, mesmo querendo lavar a louça. Isso ocorre por falta de dopamina no córtex pré-frontal.</p>
      <h3>Como vencer?</h3>
      <p>A única forma é quebrar a tarefa em micro-passos ridículos. "Lavar a louça" é assustador. "Ir até a pia" é possível. "Pegar a esponja" é possível. Foque apenas no próximo micro-passo.</p>
    `
  },
  {
    slug: "tdah-leve-existe",
    title: "TDAH leve existe? Entendendo o espectro",
    excerpt: "Existe TDAH 'só um pouquinho'? Entenda como a severidade dos sintomas varia de pessoa para pessoa.",
    keywords: ["tdah leve", "espectro tdah", "gravidade tdah"],
    content: `
      <p>O TDAH é dimensional. Isso significa que a intensidade dos sintomas varia. Algumas pessoas têm prejuízos funcionais graves, perdendo empregos e relacionamentos. Outras, com "TDAH Leve", conseguem compensar os sintomas com inteligência alta ou estruturas de apoio rígidas, mas pagam um preço emocional alto (ansiedade e burnout).</p>
      <p>Portanto, mesmo que seja "leve" aos olhos dos outros, se causa sofrimento interno, merece tratamento.</p>
    `
  },
  {
    slug: "hiperfoco-o-que-e",
    title: "Hiperfoco: o que é e como identificar",
    excerpt: "O superpoder (e a maldição) do TDAH. Por que conseguimos focar intensamente em algumas coisas e nada em outras?",
    keywords: ["hiperfoco", "foco intenso", "vantagens tdah"],
    content: `
      <p>O hiperfoco é um estado de concentração intensa onde o mundo ao redor desaparece. É contraditório ao nome "Déficit de Atenção", mas prova que o TDAH é uma instabilidade de atenção, não falta.</p>
      <h3>O lado bom</h3>
      <p>Permite produtividade massiva, criatividade e aprendizado rápido em áreas de interesse.</p>
      <h3>O lado ruim</h3>
      <p>Você pode esquecer de comer, ir ao banheiro ou dormir. O difícil é direcionar o hiperfoco para onde você precisa (o trabalho) e não para onde ele quer ir (redes sociais).</p>
    `
  },
  {
    slug: "tdah-e-ansiedade",
    title: "TDAH e ansiedade: qual a diferença?",
    excerpt: "Muitas vezes confundidos, esses dois transtornos andam de mãos dadas. Saiba diferenciar.",
    keywords: ["ansiedade", "comorbidades", "diagnóstico diferencial"],
    content: `
      <p>Cerca de 50% dos adultos com TDAH também têm transtorno de ansiedade. Mas é importante saber o que é causa e o que é consequência.</p>
      <ul class="list-disc pl-6">
        <li><strong>Ansiedade Primária:</strong> Preocupação excessiva com o futuro, medo irracional.</li>
        <li><strong>Ansiedade Secundária ao TDAH:</strong> Preocupação real causada pelos sintomas do TDAH. "Será que esqueci algo?", "Vou chegar atrasado de novo?".</li>
      </ul>
      <p>Tratar o TDAH muitas vezes reduz essa ansiedade secundária, pois a pessoa passa a confiar mais na sua própria capacidade de execução.</p>
    `
  }
];