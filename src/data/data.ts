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
}

export const tasks: Task[] = [
  {
    id: 1,
    level: 1,
    checked: true,
    name: 'Desenvolvimento do Sistema',
    durationDays: 90,
    startPlanned: '2025-01-01',
    endPlanned: '2025-03-31',
    startActual: '2025-01-02',
    endActual: '2025-03-28',
    percent: 100,
  },
  {
    id: 2,
    level: 2,
    checked: true,
    name: 'Análise de Requisitos',
    durationDays: 15,
    startPlanned: '2025-01-01',
    endPlanned: '2025-01-15',
    startActual: '2025-01-02',
    endActual: '2025-01-16',
    percent: 100,
  },
  {
    id: 3,
    level: 2,
    checked: false,
    name: 'Design da Interface',
    durationDays: 20,
    startPlanned: '2025-01-16',
    endPlanned: '2025-02-04',
    startActual: '2025-01-17',
    endActual: null,
    percent: 75,
  },
  {
    id: 4,
    level: 2,
    checked: false,
    name: 'Implementação Backend',
    durationDays: 45,
    startPlanned: '2025-02-05',
    endPlanned: '2025-03-21',
    startActual: null,
    endActual: null,
    percent: 0,
  },
  {
    id: 5,
    level: 2,
    checked: false,
    name: 'Testes e Deploy',
    durationDays: 10,
    startPlanned: '2025-03-22',
    endPlanned: '2025-03-31',
    startActual: null,
    endActual: null,
    percent: 0,
  },
]
