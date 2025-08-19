import GanttSchedule from '@/components/GanttSchedule'
import { useRef } from 'react'
import html2canvas from 'html2canvas'

function App() {
  const ganttRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="min-h-screen bg-white p-4">
      <div ref={ganttRef}>
        <GanttSchedule />
      </div>
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={exportAsImage}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
        >
          Exportar Cronograma como Imagem
        </button>
      </div>
    </div>
  )
}

export default App
