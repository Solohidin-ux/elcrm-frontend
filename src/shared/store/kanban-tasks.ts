import { create } from 'zustand'
import { initialTasks, type Task } from '@/shared/utils/moc-data'

type TaskId = Task['id']
type ChecklistItemId = string

interface KanbanTasksState {
	tasks: Task[]
	setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void
	addTask: (task: Omit<Task, 'id'>) => void
	updateTask: (taskId: TaskId, updates: Partial<Task>) => void
	toggleChecklistItem: (taskId: TaskId, itemId: ChecklistItemId, done: boolean) => void
	addNote: (taskId: TaskId, note: Omit<NonNullable<Task['notes']>[0], 'id' | 'createdAt'>) => void
	addReminder: (taskId: TaskId, reminder: Omit<NonNullable<Task['reminders']>[0], 'id'>) => void
	toggleReminder: (taskId: TaskId, reminderId: string) => void
	addInternalMessage: (taskId: TaskId, message: Omit<NonNullable<Task['internalMessages']>[0], 'id' | 'createdAt'>) => void
	addActionLog: (taskId: TaskId, log: Omit<NonNullable<Task['actionLogs']>[0], 'id' | 'timestamp'>) => void
	addTodoItem: (taskId: TaskId, text: string) => void
	toggleTodoItem: (taskId: TaskId, itemId: string, done: boolean) => void
	deleteTodoItem: (taskId: TaskId, itemId: string) => void
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
	updateTask: (taskId, updates) =>
		set(state => ({
			tasks: state.tasks.map(t => (t.id === taskId ? { ...t, ...updates } : t)),
		})),
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
	addNote: (taskId, notePayload) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							notes: [
								...(t.notes || []),
								{
									...notePayload,
									id: `note-${Date.now()}`,
									createdAt: new Date().toISOString(),
								},
							],
						}
					: t,
			),
		})),
	addReminder: (taskId, reminderPayload) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							reminders: [
								...(t.reminders || []),
								{
									...reminderPayload,
									id: `reminder-${Date.now()}`,
								},
							],
						}
					: t,
			),
		})),
	toggleReminder: (taskId, reminderId) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							reminders: (t.reminders || []).map(r =>
								r.id === reminderId ? { ...r, completed: !r.completed } : r,
							),
						}
					: t,
			),
		})),
	addInternalMessage: (taskId, messagePayload) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							internalMessages: [
								...(t.internalMessages || []),
								{
									...messagePayload,
									id: `msg-${Date.now()}`,
									createdAt: new Date().toISOString(),
								},
							],
						}
					: t,
			),
		})),
	addActionLog: (taskId, logPayload) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							actionLogs: [
								...(t.actionLogs || []),
								{
									...logPayload,
									id: `log-${Date.now()}`,
									timestamp: new Date().toISOString(),
								},
							],
						}
					: t,
			),
		})),
	addTodoItem: (taskId, text) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							todoList: [
								...(t.todoList || []),
								{
									id: `todo-${Date.now()}`,
									text: text.trim(),
									done: false,
								},
							],
						}
					: t,
			),
		})),
	toggleTodoItem: (taskId, itemId, done) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							todoList: (t.todoList || []).map(item =>
								item.id === itemId ? { ...item, done } : item,
							),
						}
					: t,
			),
		})),
	deleteTodoItem: (taskId, itemId) =>
		set(state => ({
			tasks: state.tasks.map(t =>
				t.id === taskId
					? {
							...t,
							todoList: (t.todoList || []).filter(item => item.id !== itemId),
						}
					: t,
			),
		})),
}))
