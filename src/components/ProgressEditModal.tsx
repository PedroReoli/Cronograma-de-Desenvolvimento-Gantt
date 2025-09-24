import { Task } from "@/data/data"
import { useState, useEffect } from "react"

interface ProgressEditModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (updatedTask: Task) => void
}

const ProgressEditModal = ({ isOpen, onClose, task, onSave }: ProgressEditModalProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  // Atualiza o estado quando a task muda
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task })
    }
  }, [task])

  // Função para atualizar apenas o progresso
  const updateProgress = (percent: number) => {
    if (!editedTask) return
    setEditedTask(prev => prev ? { ...prev, percent } : null)
  }

  // Função para salvar as alterações
  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask)
      onClose()
    }
  }

  // Função para cancelar
  const handleCancel = () => {
    setEditedTask(task ? { ...task } : null)
    onClose()
  }

  if (!isOpen || !task || !editedTask) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Editar Progresso</h2>
            <p className="text-sm text-gray-600 mt-1">Tarefa: {task.name}</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Informações da tarefa */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Informações da Tarefa</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Duração:</span>
                  <p className="text-gray-800">{task.durationDays} dias</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Período:</span>
                  <p className="text-gray-800">{task.startPlanned} a {task.endPlanned}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-gray-600">Status:</span>
                  <p className="text-gray-800">{task.checked ? 'Concluído' : 'Em andamento'}</p>
                </div>
              </div>
            </div>

            {/* Controle de progresso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Progresso da Tarefa
              </label>
              
              {/* Slider de progresso */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editedTask.percent || 0}
                  onChange={(e) => updateProgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #6b7280 0%, #6b7280 ${editedTask.percent || 0}%, #e5e7eb ${editedTask.percent || 0}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Input numérico */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editedTask.percent || 0}
                  onChange={(e) => updateProgress(parseInt(e.target.value) || 0)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-center font-medium"
                />
                <span className="text-gray-600 font-medium">%</span>
              </div>

              {/* Indicador visual */}
              <div className="mt-3 flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm text-gray-600">
                  {editedTask.percent || 0}% concluído
                </span>
              </div>
            </div>

            {/* Preview do Gantt */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Visualização no Cronograma</h4>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="relative h-8 bg-gray-200 rounded-sm">
                  {/* Barra de progresso */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-400 rounded-sm transition-all duration-300"
                    style={{ width: `${Math.max(editedTask.percent || 0, 2)}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {editedTask.percent || 0}%
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  A barra cinza no cronograma representa o progresso atual
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Salvar Progresso
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProgressEditModal
