import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
	Calendar,
	Check,
	CheckSquare,
	CircleDollarSign,
	Eye,
	MoreHorizontal,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { type Task } from '../../../shared/utils/moc-data.ts'
import { UrlNames } from '../../../shared/enums/UrlNames.ts'
import { cn } from '../../../shared/utils/utils.ts'

type ChecklistItemId = string

interface KanbanTaskCardProps {
	task: Task
	isOverlay?: boolean
	onChecklistToggle?: (taskId: Task['id'], itemId: ChecklistItemId, done: boolean) => void
}

function KanbanTaskCard({ task, isOverlay, onChecklistToggle }: KanbanTaskCardProps) {
	const navigate = useNavigate()
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: 'Task',
			task,
		},
		disabled: isOverlay,
	})

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	}

	const priorityColor =
		task.priority === 'high'
			? 'bg-red-100 text-red-700 border-red-200'
			: task.priority === 'medium'
				? 'bg-yellow-50 text-yellow-700 border-yellow-200'
				: 'bg-slate-100 text-slate-600 border-slate-200'

	const renderAvatar = (val?: string) => {
		if (!val) return null
		if (val.startsWith('http')) {
			return (
				<img
					src={val}
					alt='avatar'
					className='h-6 w-6 rounded-full object-cover border border-white shadow-sm'
				/>
			)
		}
		return (
			<div className='flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-600 border border-slate-200'>
				{val}
			</div>
		)
	}

	const content = isDragging ? (
		<div
			ref={setNodeRef}
			style={style}
			className='opacity-30 bg-slate-50 border-2 border-dashed border-indigo-300 h-[180px] w-full rounded-xl'
		/>
	) : (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				'group relative flex flex-col justify-between rounded-xl border bg-white p-4 shadow-sm transition-all',
				'hover:shadow-md',
				'touch-none select-none cursor-grab active:cursor-grabbing',
				isOverlay
					? 'rotate-2 scale-105 shadow-xl border-indigo-500 cursor-grabbing z-50'
					: 'border-slate-200',
			)}
		>
			<div className='space-y-2'>
				<div className='flex items-start justify-between gap-2'>
					<h3 className='text-sm font-semibold text-slate-800 leading-tight'>
						{task.title}
					</h3>
					<button className='text-slate-400 hover:text-slate-600 cursor-pointer'>
						<MoreHorizontal size={16} />
					</button>
				</div>

				<div className='flex flex-wrap gap-2'>
					<span
						className={cn(
							'px-2 py-0.5 text-[10px] font-medium rounded-full border',
							priorityColor,
						)}
					>
						{task.priority === 'high'
							? 'Срочно'
							: task.priority === 'medium'
								? 'В графике'
								: 'Низкий'}
					</span>
					<span className='flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100'>
						<CircleDollarSign size={10} />
						{task.budget}
					</span>
				</div>
			</div>

			{task.description && (
				<p className='mt-3 line-clamp-2 text-xs text-slate-500'>
					{task.description}
				</p>
			)}

			{/* Чек-лист (как в Trello) */}
			{task.checklist.length > 0 && !isOverlay && (
				<div className='mt-3 space-y-1.5 border-t border-slate-50 pt-3'>
					<div className='flex items-center gap-1.5 text-[10px] text-slate-500 font-medium'>
						<CheckSquare size={12} />
						<span>
							{task.checklist.filter(c => c.done).length}/{task.checklist.length}
						</span>
					</div>
					<ul className='space-y-1 max-h-24 overflow-y-auto shadcn-scrollbar'>
						{task.checklist.map(item => (
							<li
								key={item.id}
								className='flex items-center gap-2 text-xs group cursor-pointer touch-auto'
								onClick={e => {
									e.stopPropagation()
									e.preventDefault()
									onChecklistToggle?.(task.id, item.id, !item.done)
								}}
							>
								<span
									className={cn(
										'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-colors',
										item.done
											? 'border-primary bg-primary text-primary-foreground'
											: 'border-slate-300 bg-background',
									)}
								>
									{item.done ? <Check className='h-2.5 w-2.5' strokeWidth={3} /> : null}
								</span>
								<span
									className={cn(
										'flex-1 truncate',
										item.done && 'line-through text-slate-400',
									)}
								>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{task.checklist.length > 0 && isOverlay && (
				<div className='mt-3 flex items-center gap-1.5 text-[10px] text-slate-500 pt-3 border-t border-slate-50'>
					<CheckSquare size={12} />
					<span>
						{task.checklist.filter(c => c.done).length}/{task.checklist.length}
					</span>
				</div>
			)}

			<div className='mt-4 flex items-center justify-between pt-3 border-t border-slate-50'>
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-1.5 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500'>
						<Calendar size={12} className='text-slate-400' />
						{task.dateRange}
					</div>
				</div>

				<div className='flex items-center gap-3'>
					{task.checklist.length === 0 && (
						<div
							className='flex items-center gap-1 text-[10px] text-slate-400'
							title='Чек-лист'
						>
							<CheckSquare size={12} />
							<span>0/0</span>
						</div>
					)}
					{renderAvatar(task.assignee)}
				</div>
			</div>

			{!isOverlay && (
				<Button
					variant='outline'
					size='sm'
					className='mt-3 w-full gap-2 h-8 text-xs cursor-pointer touch-auto'
					onClick={e => {
						e.stopPropagation()
						e.preventDefault()
						navigate(`${UrlNames.FUNNEL}/${task.id}`)
					}}
				>
					<Eye size={14} />
					Детальный просмотр
				</Button>
			)}
		</div>
	)

	return content
}

export default KanbanTaskCard
