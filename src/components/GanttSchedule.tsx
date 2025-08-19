"use client"

import { tasks, type Task } from "@/data/data"
import { useMemo } from "react"

// Funções utilitárias para cálculos de data
const getYearBounds = (tasks: Task[]) => {
  const dates = tasks.flatMap((task) => [
    new Date(task.startPlanned),
    new Date(task.endPlanned),
    ...(task.startActual ? [new Date(task.startActual)] : []),
    ...(task.endActual ? [new Date(task.endActual)] : []),
  ])

  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())))
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))

  return {
    start: new Date(minDate.getFullYear(), 0, 1), // 1º de janeiro
    end: new Date(maxDate.getFullYear(), 11, 31), // 31 de dezembro
  }
}

const dayIndexInYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayIndex = Math.floor(diff / oneDay)
  return dayIndex
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const getDaysInYear = (year: number): number => {
  return isLeapYear(year) ? 366 : 365
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
  const dayName = days[date.getDay()]
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
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
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const quarters = ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]

  return (
    <div className="bg-white text-black border border-black/10 rounded-lg overflow-hidden relative">
      {/* Container principal com scroll horizontal */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {/* Tabela da esquerda */}
          <div className="flex-shrink-0 w-[1400px]">
            {/* Cabeçalho da tabela */}
            <div className="sticky top-0 bg-white border-b border-black/10 z-10">
              <div className="grid grid-cols-9 text-sm font-semibold text-black h-16">
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Id
                </div>
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Realizado
                </div>
                <div className="px-3 py-3 border-r border-black/10 flex items-center">Nome da Sprint</div>
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Duração
                </div>
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Início
                </div>
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Término
                </div>
                <div className="px-3 py-3 text-center border-r border-black/10 flex items-center justify-center">
                  Predição real
                </div>
                <div className="px-3 py-3 text-center text-xs text-black/70 border-r border-black/5 flex items-center justify-center">
                  Término real
                </div>
                <div className="px-3 py-3 text-xs text-black/70 flex items-center">Tarefas realizadas</div>
              </div>
            </div>

            {/* Linhas da tabela */}
            <div>
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`grid grid-cols-9 text-sm border-b border-black/5 hover:bg-black/5 transition-colors h-16 ${
                    index % 2 === 0 ? "bg-black/0" : "bg-black/[0.02]"
                  }`}
                >
                  <div className="px-3 py-3 text-center border-r border-black/5 font-mono text-black/80 flex items-center justify-center">
                    {task.id}
                  </div>
                  <div className="px-3 py-3 text-center border-r border-black/5 flex items-center justify-center gap-1">
                    <span className="text-black text-sm">{task.checked ? "✓" : "□"}</span>
                  </div>
                  <div
                    className="px-3 py-3 border-r border-black/5 font-medium hover:text-black/80 transition-colors flex items-center"
                    style={{ marginLeft: `${(task.level - 1) * 12}px` }}
                  >
                    {task.name}
                  </div>
                  <div className="px-3 py-3 text-center border-r border-black/5 text-black/70 flex items-center justify-center">
                    {task.durationDays} dias
                  </div>
                  <div className="px-3 py-3 text-center border-r border-black/5 text-xs text-black/70 flex items-center justify-center">
                    {formatDate(task.startPlanned)}
                  </div>
                  <div className="px-3 py-3 text-center border-r border-black/5 text-xs text-black/70 flex items-center justify-center">
                    {formatDate(task.endPlanned)}
                  </div>
                  <div className="px-3 py-3 text-center border-r border-black/5 text-xs text-black/70 flex items-center justify-center">
                    {task.startActual ? formatDate(task.startActual) : "ND"}
                  </div>
                  <div className="px-3 py-3 text-center text-xs text-black/70 border-r border-black/5 flex items-center justify-center">
                    {task.endActual ? formatDate(task.endActual) : "ND"}
                  </div>
                  <div className="px-3 py-3 text-xs text-black/70 flex items-center">{task.completedTasks || "ND"}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline da direita */}
          <div className="flex-1 min-w-0 relative">
            {/* Cabeçalho da timeline */}
            <div className="sticky top-0 bg-white border-b border-black/10 z-10">
              {/* Trimestres */}
              <div className="grid grid-cols-4 text-xs font-medium text-gray-600 border-b border-gray-200">
                {quarters.map((quarter) => (
                  <div
                    key={quarter}
                    className="py-3 px-0 text-center border-r border-gray-200 last:border-r-0 bg-gray-100 text-[10px] flex items-center justify-center h-8"
                  >
                    {quarter}
                  </div>
                ))}
              </div>

              {/* Meses */}
              <div className="grid grid-cols-12 text-xs text-gray-500">
                {months.map((month) => (
                  <div
                    key={month}
                    className="py-1 px-1 text-center border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors flex items-center justify-center h-8"
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
                const actualWidth =
                  task.startActual && task.endActual ? getBarWidth(task.startActual, task.endActual) : plannedWidth

                return (
                  <div
                    key={task.id}
                    className={`relative h-16 border-b border-black/5 hover:bg-black/[0.02] transition-colors group ${
                      index % 2 === 0 ? "bg-black/0" : "bg-black/[0.01]"
                    }`}
                  >
                    <div
                      className="absolute top-4 h-8 bg-gray-300 rounded-sm shadow-sm group-hover:shadow-md transition-shadow"
                      style={{
                        left: `${plannedLeft}%`,
                        width: `${Math.max(plannedWidth, 1)}%`,
                      }}
                      title={`${task.name} - Previsto: ${formatDate(task.startPlanned)} a ${formatDate(task.endPlanned)}`}
                    />

                    {task.startActual && (
                      <div
                        className="absolute top-4 h-8 bg-gray-600 rounded-sm shadow-sm border border-gray-500"
                        style={{
                          left: `${actualLeft}%`,
                          width: `${actualWidth}%`,
                        }}
                        title={`${task.name} - Real: ${formatDate(task.startActual)} a ${task.endActual ? formatDate(task.endActual) : "Em andamento"}`}
                      />
                    )}

                    <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-gray-200" />
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
