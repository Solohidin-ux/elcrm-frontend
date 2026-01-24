import {
	closestCorners,
	defaultDropAnimationSideEffects,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next' // 1. Импорт хука перевода

// Типы событий
import type {
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	DropAnimation,
} from '@dnd-kit/core'

import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

// Импорт наших компонентов и данных
import { toast } from 'sonner'
import {
	getInitialColumns, // 2. Импортируем функцию вместо массива
	initialTasks,
	type ColumnType,
	type Task,
} from '../../../shared/utils/moc-data.ts'
import { ColumnContainer } from './ColumnContainer'
import { TaskCard } from './TaskCard'

export default function SalesFunnelBoard() {
	const { t } = useTranslation() // 3. Инициализация перевода

	// 4. Генерируем колонки с переводами (memoizруем, чтобы не пересоздавать при каждом рендере)
	const columns = useMemo(() => getInitialColumns(t), [t])

	const [tasks, setTasks] = useState<Task[]>(initialTasks)
	const [activeTask, setActiveTask] = useState<Task | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'Task') {
			// Клонируем задачу, чтобы сохранить исходное состояние для проверки изменений при Drop
			setActiveTask({ ...event.active.data.current.task })
		}
	}

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return

		const isActiveTask = active.data.current?.type === 'Task'
		const isOverTask = over.data.current?.type === 'Task'
		const isOverColumn = over.data.current?.type === 'Column'

		if (!isActiveTask) return

		// 1. Драг задачи поверх другой задачи
		if (isActiveTask && isOverTask) {
			setTasks(tasks => {
				const activeIndex = tasks.findIndex(t => t.id === activeId)
				const overIndex = tasks.findIndex(t => t.id === overId)

				if (tasks[activeIndex].status !== tasks[overIndex].status) {
					tasks[activeIndex].status = tasks[overIndex].status
					return arrayMove(tasks, activeIndex, overIndex - 1)
				}

				return arrayMove(tasks, activeIndex, overIndex)
			})
		}

		// 2. Драг задачи в пустую колонку
		if (isActiveTask && isOverColumn) {
			setTasks(tasks => {
				const activeIndex = tasks.findIndex(t => t.id === activeId)

				if (tasks[activeIndex].status !== overId) {
					tasks[activeIndex].status = overId as ColumnType
				}

				return arrayMove(tasks, activeIndex, activeIndex)
			})
		}
	}

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		// Получаем текущую (измененную) версию задачи
		const currentTask = tasks.find(t => t.id === active.id)
		// Получаем исходную версию
		const initialTask = activeTask

		// Проверка изменения статуса
		if (
			currentTask &&
			initialTask &&
			currentTask.status !== initialTask.status
		) {
			console.log(
				`[STATUS CHANGED] Task "${currentTask.title}" moved from "${initialTask.status}" to "${currentTask.status}"`,
				currentTask,
			)
			toast.success('Изменение статуса', {
				description: `Task "${currentTask.title}" moved from "${initialTask.status}" to "${currentTask.status}"`,
				position: 'top-center',
				descriptionClassName: '!text-black font-medium',
				duration: 10000,
			})
		}

		setActiveTask(null)

		if (!over) return

		const activeId = active.id
		const overId = over.id

		if (activeId === overId) return

		const isActiveTask = active.data.current?.type === 'Task'
		const isOverTask = over.data.current?.type === 'Task'

		if (isActiveTask && isOverTask) {
			setTasks(tasks => {
				const activeIndex = tasks.findIndex(t => t.id === activeId)
				const overIndex = tasks.findIndex(t => t.id === overId)
				if (tasks[activeIndex].status === tasks[overIndex].status) {
					return arrayMove(tasks, activeIndex, overIndex)
				}
				return tasks
			})
		}
	}

	const dropAnimation: DropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: '0.5',
				},
			},
		}),
	}

	return (
		<div className='h-screen flex flex-col text-slate-900 overflow-hidden'>
			<style>{`
        .shadcn-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .shadcn-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .shadcn-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .shadcn-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>

			<div className='flex-none pb-4 flex items-center justify-between border-b border-slate-100'>
				<h1 className='text-2xl font-bold tracking-tight text-slate-900'>
					{t('kanban.title', 'Задачи проекта')}
				</h1>
				<button className='flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm'>
					<Plus size={16} />
					{t('kanban.newTask', 'Новая задача')}
				</button>
			</div>

			<div className='flex-1 overflow-x-auto overflow-y-hidden'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDragEnd={onDragEnd}
				>
					<div className='flex h-full gap-6 pt-6 min-w-max'>
						{columns.map(col => (
							<ColumnContainer
								key={col.id}
								column={col}
								tasks={tasks.filter(t => t.status === col.id)}
							/>
						))}
					</div>

					<DragOverlay dropAnimation={dropAnimation}>
						{activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
					</DragOverlay>
				</DndContext>
			</div>
		</div>
	)
}
