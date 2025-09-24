import GanttSchedule from '@/components/GanttSchedule'
import EditModal from '@/components/EditModal'
import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { tasks as initialTasks, quarters as initialQuarters, type Task, type Quarter } from '@/data/data'

function App() {
  const ganttRef = useRef<HTMLDivElement>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [quarters, setQuarters] = useState<Quarter[]>(initialQuarters)

  const exportAsImage = async () => {
    if (!ganttRef.current) return

    try {
      const canvas = await html2canvas(ganttRef.current, {
        useCORS: true,
        allowTaint: true,
        background: '#ffffff',
        width: ganttRef.current.scrollWidth + 50, // Adiciona margem extra na largura
        height: ganttRef.current.scrollHeight + 20, // Adiciona margem extra na altura
      })

      const image = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = `cronograma-falaatipica-${new Date().toISOString().split('T')[0]}.png`
      link.href = image
      link.click()
    } catch (error) {
      console.error('Erro ao exportar imagem:', error)
      alert('Erro ao exportar imagem. Tente novamente.')
    }
  }

  // Função para salvar as alterações das tarefas e trimestres
  const handleSaveTasks = (updatedTasks: Task[], updatedQuarters: Quarter[]) => {
    setTasks(updatedTasks)
    setQuarters(updatedQuarters)
  }

  // Função para atualizar uma tarefa individual (do Gantt)
  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div ref={ganttRef}>
        <GanttSchedule 
          tasks={tasks} 
          quarters={quarters} 
          onTaskUpdate={handleTaskUpdate}
        />
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar Dados
        </button>
        
        <button
          onClick={exportAsImage}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar Cronograma
        </button>
      </div>

      {/* Modal de Edição */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tasks={tasks}
        quarters={quarters}
        onSave={handleSaveTasks}
      />
    </div>
  )
}

export default App
