# Cronograma de Desenvolvimento - Gantt Schedule

## Descrição
Componente React + TypeScript que renderiza um cronograma estilo Gantt com tabela de tarefas à esquerda e timeline de trimestres/meses à direita. Desenvolvido com Tailwind CSS e design monocromático (preto sobre fundo branco).

## Tecnologias
- React 18.2.0
- TypeScript 5.2.2
- Tailwind CSS 3.3.6
- Vite 5.0.8

## Instalação
```bash
npm install
npm run dev
```

## Estrutura do Projeto
```
src/
├── components/
│   └── GanttSchedule.tsx     # Componente principal do cronograma
├── data/
│   └── data.ts               # Dados das tarefas e tipos TypeScript
├── App.tsx                   # Componente raiz da aplicação
├── main.tsx                  # Ponto de entrada do React
└── index.css                 # Estilos globais com Tailwind
```

## Funcionalidades

### Layout
- **Tabela à esquerda**: 8 colunas fixas com cabeçalho sticky
- **Timeline à direita**: Escala anual com trimestres e meses
- **Scroll horizontal**: Ambas as áreas rolam em conjunto
- **Design responsivo**: Adaptável a diferentes tamanhos de tela

### Colunas da Tabela
1. **Id**: Identificador numérico da tarefa
2. **Mo**: Checkbox para marcar tarefa (visual)
3. **Nome da Tarefa**: Suporte a níveis WBS com recuo visual
4. **Duração**: Exibição em dias
5. **Início**: Data prevista de início
6. **Término**: Data prevista de término
7. **Pré-início real**: Data real de início (ou "ND")
8. **Término real**: Data real de término (ou "ND")

### Timeline
- **Trimestres**: 1º, 2º, 3º, 4º trimestre
- **Meses**: Jan a Dez com divisórias verticais
- **Barras Gantt**: 
  - Barra prevista (preto sólido)
  - Barra real (preto com opacidade e borda)
  - Percentual de conclusão
- **Tooltips**: Informações detalhadas ao passar o mouse

### Recursos Técnicos
- **Cálculo de datas**: Suporte a anos bissextos
- **Posicionamento proporcional**: Barras baseadas em dias do ano
- **Dados externos**: Toda informação vem de `src/data/data.ts`
- **Tipos TypeScript**: Interface `Task` bem definida

## Tipos de Dados

```typescript
export type Task = {
  id: number
  level: number        // 1 = sumário, 2/3 = subtarefas
  checked: boolean     // Status de conclusão
  name: string         // Nome da tarefa
  durationDays: number // Duração em dias
  startPlanned: string // Data prevista de início (ISO)
  endPlanned: string   // Data prevista de término (ISO)
  startActual?: string | null  // Data real de início
  endActual?: string | null    // Data real de término
  percent?: number     // Percentual de conclusão (0-100)
}
```

## Scripts Disponíveis
- `npm run dev`: Inicia servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Visualiza build de produção
- `npm run lint`: Executa linting do código
- `npm run format`: Formata código com Prettier

## Configurações
- **Path Mapping**: `@/` aponta para `src/`
- **Tailwind**: Configurado para arquivos React/TypeScript
- **Prettier**: Formatação automática com regras padronizadas
- **ESLint**: Linting com regras TypeScript e React

## Deploy
O projeto pode ser deployado em qualquer plataforma que suporte aplicações React estáticas (Vercel, Netlify, GitHub Pages, etc.).

```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`.

## Acessibilidade
- Contraste adequado (preto sobre branco)
- Tooltips informativos
- Estrutura semântica com grid CSS
- Suporte a navegação por teclado

