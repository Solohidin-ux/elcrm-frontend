import {
	closestCorners,
	defaultDropAnimationSideEffects,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragOverEvent,
	type DragStartEvent,
	type DropAnimation,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useKanbanTasksStore } from '@/shared/store/kanban-tasks'
import {
	getInitialColumns,
	type ColumnType,
	type Task,
} from '../../../shared/utils/moc-data.ts'
import KanbanColumnContainer from './KanbanColumnContainer.tsx'
import KanbanEditTask from './KanbanEditTask.tsx'
import KanbanTaskCard from './KanbanTaskCard.tsx'

function KanbanBoard() {
	const { t } = useTranslation()
	const { tasks, setTasks, toggleChecklistItem, updateTask } = useKanbanTasksStore()
	const [editingTask, setEditingTask] = useState<Task | null>(null)

	const columns = useMemo(() => getInitialColumns(t), [t])

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

		const currentTask = tasks.find(t => t.id === active.id)
		const initialTask = activeTask

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

	const content = (
		<div className='flex-1 overflow-x-auto overflow-y-hidden h-[73vh] flex flex-col text-slate-900 overflow-hidden'>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDragEnd={onDragEnd}
			>
				<div className='flex h-full gap-4 pt-6 min-w-max'>
					{columns.map(col => (
						<KanbanColumnContainer
							key={col.id}
							column={col}
							tasks={tasks.filter(t => t.status === col.id)}
							onChecklistToggle={toggleChecklistItem}
							onEdit={setEditingTask}
						/>
					))}
				</div>

				<DragOverlay dropAnimation={dropAnimation}>
					{activeTask ? <KanbanTaskCard task={activeTask} isOverlay /> : null}
				</DragOverlay>
			</DndContext>

			<KanbanEditTask
				task={editingTask}
				open={!!editingTask}
				onOpenChange={open => !open && setEditingTask(null)}
				onSave={updateTask}
			/>
		</div>
	)

	return content
}

export default KanbanBoard
