export type Task = {
  id: number
  level: number // 1 = sumário, 2/3 = subtarefas
  checked: boolean
  name: string
  durationDays: number
  startPlanned: string // ISO YYYY-MM-DD
  endPlanned: string // ISO YYYY-MM-DD
  startActual?: string | null
  endActual?: string | null
  percent?: number // 0..100
  completedTasks?: string // Tarefas realizadas
}

// Tipo para dados sem ID (será gerado automaticamente)
export type TaskInput = Omit<Task, 'id'>

// Função para criar tarefas com ID auto increment
const createTasks = (taskInputs: TaskInput[]): Task[] => {
  return taskInputs.map((task, index) => ({
    ...task,
    id: index + 1, // Auto increment: 1, 2, 3, 4...
  }))
}

// Dados das tarefas (sem ID - será gerado automaticamente)
const taskInputs: TaskInput[] = [
  {
    level: 1,
    checked: false,
    name: 'TCC FalaAtípica',
    durationDays: 180,
    startPlanned: '2025-01-14',
    endPlanned: '2025-10-17',
    startActual: '2025-01-20',
    endActual: '2025-11-14',
    percent: 31,
  },
  {
    level: 2,
    checked: true,
    name: 'Pesquisa inicial',
    durationDays: 20,
    startPlanned: '2025-01-14',
    endPlanned: '2025-02-10',
    startActual: '2025-01-20',
    endActual: '2025-02-16',
    percent: 100,
    completedTasks: 'Metodologias ativas, startups na educação',
  },
  {
    level: 2,
    checked: true,
    name: 'Documentação inicial',
    durationDays: 20,
    startPlanned: '2025-02-11',
    endPlanned: '2025-03-10',
    startActual: '2025-02-17',
    endActual: '2025-03-16',
    percent: 100,
    completedTasks: 'Growth hacking, inclusão, documentação da pesquisa',
  },
  {
    level: 2,
    checked: true,
    name: 'Planejamento da solução',
    durationDays: 20,
    startPlanned: '2025-03-11',
    endPlanned: '2025-03-31',
    startActual: '2025-03-17',
    endActual: '2025-04-06',
    percent: 100,
    completedTasks: 'Plano de desenvolvimento da startup',
  },
  {
    level: 2,
    checked: true,
    name: 'Modelo de negócio',
    durationDays: 15,
    startPlanned: '2025-04-01',
    endPlanned: '2025-04-21',
    startActual: '2025-04-07',
    endActual: '2025-04-27',
    percent: 100,
    completedTasks: 'Construção do modelo de negócio',
  },
  {
    level: 2,
    checked: true,
    name: 'Gestão econômica',
    durationDays: 15,
    startPlanned: '2025-04-22',
    endPlanned: '2025-05-12',
    startActual: '2025-04-28',
    endActual: '2025-05-18',
    percent: 100,
    completedTasks: 'Análise de custos e viabilidade',
  },
  {
    level: 2,
    checked: false,
    name: 'Design da plataforma',
    durationDays: 15,
    startPlanned: '2025-05-13',
    endPlanned: '2025-06-02',
    startActual: '2025-05-19',
    endActual: '2025-06-08',
    percent: 0,
    completedTasks: 'Fluxos, telas e arquitetura do sistema',
  },
  {
    level: 2,
    checked: false,
    name: 'Desenvolvimento MVP',
    durationDays: 20,
    startPlanned: '2025-06-03',
    endPlanned: '2025-06-30',
    startActual: '2025-06-09',
    endActual: '2025-07-06',
    percent: 0,
    completedTasks: 'Codificação do protótipo',
  },
  {
    level: 2,
    checked: false,
    name: 'Testes iniciais',
    durationDays: 15,
    startPlanned: '2025-07-01',
    endPlanned: '2025-07-21',
    startActual: '2025-07-07',
    endActual: '2025-07-27',
    percent: 0,
    completedTasks: 'Testes com usuários-alvo',
  },
  {
    level: 2,
    checked: false,
    name: 'Validação e ajustes',
    durationDays: 20,
    startPlanned: '2025-07-22',
    endPlanned: '2025-08-18',
    startActual: '2025-07-28',
    endActual: '2025-08-24',
    percent: 0,
    completedTasks: 'Feedback, correções no MVP',
  },
  {
    level: 2,
    checked: false,
    name: 'Documentação técnica',
    durationDays: 15,
    startPlanned: '2025-08-19',
    endPlanned: '2025-09-08',
    startActual: '2025-08-25',
    endActual: '2025-09-14',
    percent: 0,
    completedTasks: 'Documentação do sistema e acadêmica',
  },
  {
    level: 2,
    checked: false,
    name: 'Escrita final',
    durationDays: 20,
    startPlanned: '2025-09-09',
    endPlanned: '2025-10-06',
    startActual: '2025-09-15',
    endActual: '2025-10-05',
    percent: 0,
    completedTasks: 'Redação final do TCC',
  },
  {
    level: 2,
    checked: false,
    name: 'Finalização e defesa',
    durationDays: 11,
    startPlanned: '2025-10-07',
    endPlanned: '2025-10-17',
    startActual: '2025-10-06',
    endActual: '2025-11-14',
    percent: 0,
    completedTasks: 'Ajustes finais, entrega e defesa',
  },
]

// Exporta as tarefas com IDs gerados automaticamente
export const tasks: Task[] = createTasks(taskInputs)