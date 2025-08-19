import { tasks, Task } from '@/data/data'
import { useMemo } from 'react'

// Funções utilitárias para cálculos de data
const getYearBounds = (tasks: Task[]) => {
  const dates = tasks.flatMap(task => [
    new Date(task.startPlanned),
    new Date(task.endPlanned),
    ...(task.startActual ? [new Date(task.startActual)] : []),
    ...(task.endActual ? [new Date(task.endActual)] : []),
  ])
  
  const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))
  
  return {
    start: new Date(minDate.getFullYear(), 0, 1), // 1º de janeiro
    end: new Date(maxDate.getFullYear(), 11, 31), // 31 de dezembro
  }
}

const dayIndexInYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const getDaysInYear = (year: number): number => {
  return isLeapYear(year) ? 366 : 365
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const dayName = days[date.getDay()]
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString().slice(-2)
  return `${dayName} ${day}/${month}/${year}`
}

const GanttSchedule = () => {
  const yearBounds = useMemo(() => getYearBounds(tasks), [])
  const totalDays = getDaysInYear(yearBounds.start.getFullYear())
  
  // Cálculo de posição e largura das barras
  const getBarPosition = (date: string) => {
    const dayIndex = dayIndexInYear(new Date(date))
    return (dayIndex / totalDays) * 100
  }
  
  const getBarWidth = (startDate: string, endDate: string) => {
    const startIndex = dayIndexInYear(new Date(startDate))
    const endIndex = dayIndexInYear(new Date(endDate))
    const duration = endIndex - startIndex + 1
    return (duration / totalDays) * 100
  }
  
  // Meses e trimestres
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ]
  
  const quarters = [
    '1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre'
  ]
  
  return (
    <div className="bg-white text-black border border-black/10 rounded-lg overflow-hidden">
      {/* Container principal com scroll horizontal */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          
          {/* Tabela da esquerda */}
          <div className="flex-shrink-0 w-96">
            {/* Cabeçalho da tabela */}
            <div className="sticky top-0 bg-white border-b border-black/10 z-10">
              <div className="grid grid-cols-8 text-sm font-semibold text-black">
                <div className="p-3 text-right border-r border-black/10">Id</div>
                <div className="p-3 text-center border-r border-black/10">Mo</div>
                <div className="p-3 border-r border-black/10">Nome da Tarefa</div>
                <div className="p-3 text-center border-r border-black/10">Duração</div>
                <div className="p-3 text-center border-r border-black/10">Início</div>
                <div className="p-3 text-center border-r border-black/10">Término</div>
                <div className="p-3 text-center border-r border-black/10">Pré-início real</div>
                <div className="p-3 text-center">Término real</div>
              </div>
            </div>
            
            {/* Linhas da tabela */}
            <div>
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`grid grid-cols-8 text-sm border-b border-black/10 ${
                    index % 2 === 0 ? 'bg-black/0' : 'bg-black/5'
                  }`}
                >
                  <div className="p-3 text-right border-r border-black/10 font-mono">
                    {task.id}
                  </div>
                  <div className="p-3 text-center border-r border-black/10">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      readOnly
                      className="w-4 h-4 text-black border-black/30 rounded"
                    />
                  </div>
                  <div 
                    className="p-3 border-r border-black/10 font-medium"
                    style={{ marginLeft: `${(task.level - 1) * 12}px` }}
                  >
                    {task.name}
                  </div>
                  <div className="p-3 text-center border-r border-black/10">
                    {task.durationDays} dias
                  </div>
                  <div className="p-3 text-center border-r border-black/10 text-xs">
                    {formatDate(task.startPlanned)}
                  </div>
                  <div className="p-3 text-center border-r border-black/10 text-xs">
                    {formatDate(task.endPlanned)}
                  </div>
                  <div className="p-3 text-center border-r border-black/10 text-xs">
                    {task.startActual ? formatDate(task.startActual) : 'ND'}
                  </div>
                  <div className="p-3 text-center text-xs">
                    {task.endActual ? formatDate(task.endActual) : 'ND'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Timeline da direita */}
          <div className="flex-1 min-w-0">
            {/* Cabeçalho da timeline */}
            <div className="sticky top-0 bg-white border-b border-black/10 z-10">
              {/* Trimestres */}
              <div className="grid grid-cols-4 text-sm font-semibold text-black border-b border-black/10">
                {quarters.map((quarter) => (
                  <div key={quarter} className="p-2 text-center border-r border-black/10 last:border-r-0">
                    {quarter}
                  </div>
                ))}
              </div>
              
              {/* Meses */}
              <div className="grid grid-cols-12 text-xs text-black">
                {months.map((month) => (
                  <div
                    key={month}
                    className="p-1 text-center border-r border-black/10 last:border-r-0"
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Barras do Gantt */}
            <div className="relative">
              {tasks.map((task, index) => {
                const plannedLeft = getBarPosition(task.startPlanned)
                const plannedWidth = getBarWidth(task.startPlanned, task.endPlanned)
                const actualLeft = task.startActual ? getBarPosition(task.startActual) : plannedLeft
                const actualWidth = task.startActual && task.endActual 
                  ? getBarWidth(task.startActual, task.endActual) 
                  : plannedWidth
                
                return (
                  <div
                    key={task.id}
                    className={`relative h-12 border-b border-black/10 ${
                      index % 2 === 0 ? 'bg-black/0' : 'bg-black/5'
                    }`}
                  >
                    {/* Barra prevista */}
                    <div
                      className="absolute top-2 h-8 bg-black rounded-sm"
                      style={{
                        left: `${plannedLeft}%`,
                        width: `${plannedWidth}%`,
                      }}
                      title={`${task.name} - Previsto: ${formatDate(task.startPlanned)} a ${formatDate(task.endPlanned)}`}
                    />
                    
                    {/* Barra real (se houver) */}
                    {task.startActual && (
                      <div
                        className="absolute top-2 h-8 bg-black/80 border-2 border-black rounded-sm"
                        style={{
                          left: `${actualLeft}%`,
                          width: `${actualWidth}%`,
                        }}
                        title={`${task.name} - Real: ${formatDate(task.startActual)} a ${task.endActual ? formatDate(task.endActual) : 'Em andamento'}`}
                      />
                    )}
                    
                    {/* Percentual */}
                    {task.percent !== undefined && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white z-10"
                        style={{
                          left: `${plannedLeft + plannedWidth / 2}%`,
                        }}
                      >
                        {task.percent}%
                      </div>
                    )}
                    
                    {/* Grid vertical dos meses */}
                    <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-black/10" />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GanttSchedule

// Checkup das funções:
// getYearBounds: Calcula os limites do ano para a escala da timeline
// dayIndexInYear: Calcula o índice do dia no ano (0-based)
// isLeapYear: Verifica se o ano é bissexto
// getDaysInYear: Retorna o número total de dias no ano
// formatDate: Formata a data para exibição curta
// getBarPosition: Calcula a posição X da barra baseada na data
// getBarWidth: Calcula a largura da barra baseada na duração
