import { Task } from "@/data/data"
import { useState, useEffect } from "react"

interface QuickEditModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onSave: (updatedTask: Task) => void
}

const QuickEditModal = ({ isOpen, onClose, task, onSave }: QuickEditModalProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null)

  // Atualiza o estado quando a task muda
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task })
    }
  }, [task])

  // Função para atualizar um campo da tarefa
  const updateField = (field: keyof Task, value: any) => {
    if (!editedTask) return
    setEditedTask(prev => prev ? { ...prev, [field]: value } : null)
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

  // Formatação de data para input
  const formatDateForInput = (dateString: string) => {
    return dateString
  }

  if (!isOpen || !task || !editedTask) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-blue-50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edição Rápida</h2>
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
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome da tarefa */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Sprint
                </label>
                <input
                  type="text"
                  value={editedTask.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Nível */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nível
                </label>
                <select
                  value={editedTask.level}
                  onChange={(e) => updateField('level', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 - Sumário</option>
                  <option value={2}>2 - Subtarefa</option>
                  <option value={3}>3 - Sub-subtarefa</option>
                </select>
              </div>

              {/* Duração */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duração (dias)
                </label>
                <input
                  type="number"
                  value={editedTask.durationDays}
                  onChange={(e) => updateField('durationDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Realizado
                </label>
                <select
                  value={editedTask.checked ? 'true' : 'false'}
                  onChange={(e) => updateField('checked', e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>

              {/* Percentual */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Progresso (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editedTask.percent || 0}
                  onChange={(e) => updateField('percent', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Início planejado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Início Planejado
                </label>
                <input
                  type="date"
                  value={formatDateForInput(editedTask.startPlanned)}
                  onChange={(e) => updateField('startPlanned', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Término planejado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Término Planejado
                </label>
                <input
                  type="date"
                  value={formatDateForInput(editedTask.endPlanned)}
                  onChange={(e) => updateField('endPlanned', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Início real */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Início Real
                </label>
                <input
                  type="date"
                  value={editedTask.startActual ? formatDateForInput(editedTask.startActual) : ''}
                  onChange={(e) => updateField('startActual', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Término real */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Término Real
                </label>
                <input
                  type="date"
                  value={editedTask.endActual ? formatDateForInput(editedTask.endActual) : ''}
                  onChange={(e) => updateField('endActual', e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tarefas realizadas */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarefas Realizadas
                </label>
                <textarea
                  value={editedTask.completedTasks || ''}
                  onChange={(e) => updateField('completedTasks', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva as tarefas realizadas..."
                />
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickEditModal
