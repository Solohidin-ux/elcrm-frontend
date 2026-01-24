import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useMemo } from 'react'
import type { Column, Task } from '../../../shared/utils/moc-data.ts'
import { cn } from '../../../shared/utils/utils.ts'
import KanbanTaskCard from './KanbanTaskCard.tsx'

interface KanbanColumnContainerProps {
	column: Column
	tasks: Task[]
}

function KanbanColumnContainer({ column, tasks }: KanbanColumnContainerProps) {
	const { setNodeRef } = useSortable({
		id: column.id,
		data: {
			type: 'Column',
			column,
		},
		disabled: true,
	})

	const tasksIds = useMemo(() => tasks.map(t => t.id), [tasks])

	const content = (
		<div
			ref={setNodeRef}
			className='flex h-full flex-1 shrink-0 flex-col rounded-md bg-slate-50/80 border border-slate-200/60'
		>
			<div className='flex-none flex items-center justify-between p-4 pb-2'>
				<div className='flex items-center gap-2'>
					<div className={cn('h-2.5 w-2.5 rounded-full', column.color)} />
					<span className='font-semibold text-slate-700 text-sm'>
						{column.title}
					</span>
					<span className='flex h-5 min-w-5 items-center justify-center rounded-md bg-slate-200/50 px-1.5 text-[10px] font-bold text-slate-500'>
						{tasks.length}
					</span>
				</div>
			</div>

			<div className='flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-3 shadcn-scrollbar'>
				<SortableContext
					items={tasksIds}
					strategy={verticalListSortingStrategy}
				>
					{tasks.map(task => (
						<KanbanTaskCard key={task.id} task={task} />
					))}
				</SortableContext>

				{tasks.length === 0 && (
					<div className='flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 text-sm text-slate-400'>
						Перетащите сюда
					</div>
				)}
			</div>
		</div>
	)

	return content
}

export default KanbanColumnContainer
