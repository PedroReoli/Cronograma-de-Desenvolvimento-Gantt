import { Task, Quarter } from "@/data/data"
import { useState } from "react"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  tasks: Task[]
  quarters: Quarter[]
  onSave: (updatedTasks: Task[], updatedQuarters: Quarter[]) => void
}

const EditModal = ({ isOpen, onClose, tasks, quarters, onSave }: EditModalProps) => {
  const [editedTasks, setEditedTasks] = useState<Task[]>(tasks)
  const [editedQuarters, setEditedQuarters] = useState<Quarter[]>(quarters)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editingQuarter, setEditingQuarter] = useState<Quarter | null>(null)
  const [activeTab, setActiveTab] = useState<'tasks' | 'quarters'>('tasks')

  // Função para gerar novo ID
  const getNextId = (items: (Task | Quarter)[]) => {
    return Math.max(...items.map(item => item.id), 0) + 1
  }

  // Função para atualizar uma tarefa específica
  const updateTask = (taskId: number, field: keyof Task, value: any) => {
    setEditedTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, [field]: value }
          : task
      )
    )
  }

  // Função para atualizar um trimestre específico
  const updateQuarter = (quarterId: number, field: keyof Quarter, value: any) => {
    setEditedQuarters(prev => 
      prev.map(quarter => 
        quarter.id === quarterId 
          ? { ...quarter, [field]: value }
          : quarter
      )
    )
  }

  // Função para adicionar nova tarefa
  const addNewTask = () => {
    const newTask: Task = {
      id: getNextId(editedTasks),
      level: 2,
      checked: false,
      name: "Nova Tarefa",
      durationDays: 7,
      startPlanned: new Date().toISOString().split('T')[0],
      endPlanned: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      percent: 0,
      completedTasks: ""
    }
    setEditedTasks(prev => [...prev, newTask])
    setEditingTask(newTask)
  }

  // Função para adicionar novo trimestre
  const addNewQuarter = () => {
    const newQuarter: Quarter = {
      id: getNextId(editedQuarters),
      name: "Novo Trimestre",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    }
    setEditedQuarters(prev => [...prev, newQuarter])
    setEditingQuarter(newQuarter)
  }

  // Função para deletar tarefa
  const deleteTask = (taskId: number) => {
    setEditedTasks(prev => prev.filter(task => task.id !== taskId))
    if (editingTask?.id === taskId) {
      setEditingTask(null)
    }
  }

  // Função para deletar trimestre
  const deleteQuarter = (quarterId: number) => {
    setEditedQuarters(prev => prev.filter(quarter => quarter.id !== quarterId))
    if (editingQuarter?.id === quarterId) {
      setEditingQuarter(null)
    }
  }

  // Função para salvar as alterações
  const handleSave = () => {
    onSave(editedTasks, editedQuarters)
    onClose()
  }

  // Função para cancelar e restaurar dados originais
  const handleCancel = () => {
    setEditedTasks(tasks)
    setEditedQuarters(quarters)
    setEditingTask(null)
    setEditingQuarter(null)
    onClose()
  }

  // Formatação de data para input
  const formatDateForInput = (dateString: string) => {
    return dateString
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Editar Dados do Cronograma</h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tarefas ({editedTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('quarters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'quarters'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trimestres ({editedQuarters.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                {/* Botão para adicionar nova tarefa */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Gerenciar Tarefas</h3>
                  <button
                    onClick={addNewTask}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar Tarefa
                  </button>
                </div>

                {editedTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400 text-sm font-mono">#{task.id}</div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {task.name}
                        </h3>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          Ordem: {index + 1}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingTask(editingTask?.id === task.id ? null : task)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          {editingTask?.id === task.id ? 'Cancelar' : 'Editar'}
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    {editingTask?.id === task.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Nível */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nível
                          </label>
                          <select
                            value={task.level}
                            onChange={(e) => updateTask(task.id, 'level', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={1}>1 - Sumário</option>
                            <option value={2}>2 - Subtarefa</option>
                            <option value={3}>3 - Sub-subtarefa</option>
                          </select>
                        </div>

                        {/* Nome da tarefa */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome da Sprint
                          </label>
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => updateTask(task.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Duração */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duração (dias)
                          </label>
                          <input
                            type="number"
                            value={task.durationDays}
                            onChange={(e) => updateTask(task.id, 'durationDays', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Status */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Realizado
                          </label>
                          <select
                            value={task.checked ? 'true' : 'false'}
                            onChange={(e) => updateTask(task.id, 'checked', e.target.value === 'true')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                          </select>
                        </div>

                        {/* Início planejado */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Início Planejado
                          </label>
                          <input
                            type="date"
                            value={formatDateForInput(task.startPlanned)}
                            onChange={(e) => updateTask(task.id, 'startPlanned', e.target.value)}
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
                            value={formatDateForInput(task.endPlanned)}
                            onChange={(e) => updateTask(task.id, 'endPlanned', e.target.value)}
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
                            value={task.startActual ? formatDateForInput(task.startActual) : ''}
                            onChange={(e) => updateTask(task.id, 'startActual', e.target.value || null)}
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
                            value={task.endActual ? formatDateForInput(task.endActual) : ''}
                            onChange={(e) => updateTask(task.id, 'endActual', e.target.value || null)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Percentual */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Percentual (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={task.percent || 0}
                            onChange={(e) => updateTask(task.id, 'percent', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Tarefas realizadas */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tarefas Realizadas
                          </label>
                          <textarea
                            value={task.completedTasks || ''}
                            onChange={(e) => updateTask(task.id, 'completedTasks', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Descreva as tarefas realizadas..."
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Nível:</span> {task.level}
                        </div>
                        <div>
                          <span className="font-medium">Duração:</span> {task.durationDays} dias
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> {task.checked ? 'Realizado' : 'Pendente'}
                        </div>
                        <div>
                          <span className="font-medium">Início:</span> {task.startPlanned}
                        </div>
                        <div>
                          <span className="font-medium">Término:</span> {task.endPlanned}
                        </div>
                        {task.startActual && (
                          <div>
                            <span className="font-medium">Início Real:</span> {task.startActual}
                          </div>
                        )}
                        {task.endActual && (
                          <div>
                            <span className="font-medium">Término Real:</span> {task.endActual}
                          </div>
                        )}
                        {task.percent !== undefined && (
                          <div>
                            <span className="font-medium">Progresso:</span> {task.percent}%
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'quarters' && (
              <div className="space-y-4">
                {/* Botão para adicionar novo trimestre */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Gerenciar Trimestres</h3>
                  <button
                    onClick={addNewQuarter}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar Trimestre
                  </button>
                </div>

                {editedQuarters.map((quarter) => (
                  <div
                    key={quarter.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400 text-sm font-mono">#{quarter.id}</div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {quarter.name}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingQuarter(editingQuarter?.id === quarter.id ? null : quarter)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          {editingQuarter?.id === quarter.id ? 'Cancelar' : 'Editar'}
                        </button>
                        <button
                          onClick={() => deleteQuarter(quarter.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    {editingQuarter?.id === quarter.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Nome do trimestre */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Trimestre
                          </label>
                          <input
                            type="text"
                            value={quarter.name}
                            onChange={(e) => updateQuarter(quarter.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Data de início */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Início
                          </label>
                          <input
                            type="date"
                            value={formatDateForInput(quarter.startDate)}
                            onChange={(e) => updateQuarter(quarter.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Data de fim */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Fim
                          </label>
                          <input
                            type="date"
                            value={formatDateForInput(quarter.endDate)}
                            onChange={(e) => updateQuarter(quarter.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Nome:</span> {quarter.name}
                        </div>
                        <div>
                          <span className="font-medium">Início:</span> {quarter.startDate}
                        </div>
                        <div>
                          <span className="font-medium">Fim:</span> {quarter.endDate}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
