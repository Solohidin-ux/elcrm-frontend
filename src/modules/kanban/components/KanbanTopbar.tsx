import { useKanbanTasksStore } from '@/shared/store/kanban-tasks'
import KanbanAddTask from './KanbanAddTask'

function KanbanTopbar() {
	const addTask = useKanbanTasksStore(s => s.addTask)

	return (
		<div className='flex-none p-4 flex items-center justify-between '>
			<h1 className='text-2xl font-bold tracking-tight text-slate-900'>
				Задачи проекта
			</h1>
			<KanbanAddTask onAddTask={addTask} />
		</div>
	)
}

export default KanbanTopbar
