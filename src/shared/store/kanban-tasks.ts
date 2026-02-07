import { create } from 'zustand'
import { initialTasks, type Task } from '@/shared/utils/moc-data'

type TaskId = Task['id']
type ChecklistItemId = string

interface KanbanTasksState {
	tasks: Task[]
	setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void
	addTask: (task: Omit<Task, 'id'>) => void
	toggleChecklistItem: (taskId: TaskId, itemId: ChecklistItemId, done: boolean) => void
}

export const useKanbanTasksStore = create<KanbanTasksState>(set => ({
	tasks: initialTasks,
	setTasks: updater =>
		set(state => ({
			tasks: typeof updater === 'function' ? updater(state.tasks) : updater,
		})),
	addTask: taskPayload =>
		set(state => {
			const newId = String(Date.now())
			const newTask: Task = {
				...taskPayload,
				id: newId,
				checklist: taskPayload.checklist ?? [],
			}
			return { tasks: [...state.tasks, newTask] }
		}),
	toggleChecklistItem: (taskId, itemId, done) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							checklist: t.checklist.map(item =>
								item.id === itemId ? { ...item, done } : item,
							),
						}
					: t,
			),
		})),
}))
