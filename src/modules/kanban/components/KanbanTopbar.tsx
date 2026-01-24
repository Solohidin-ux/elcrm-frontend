import KanbanAddTask from './KanbanAddTask'

function KanbanTopbar() {
	const content = (
		<div className='flex-none p-4 flex items-center justify-between '>
			<h1 className='text-2xl font-bold tracking-tight text-slate-900'>
				Задачи проекта
			</h1>
			<KanbanAddTask />
		</div>
	)

	return content
}

export default KanbanTopbar
