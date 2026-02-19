import { Check, CheckSquare, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { ChecklistItem } from '@/shared/utils/moc-data'

interface TaskTodoListProps {
	todoList: ChecklistItem[]
	onAddTodo: (text: string) => void
	onToggleTodo: (itemId: string, done: boolean) => void
	onDeleteTodo: (itemId: string) => void
}

export default function TaskTodoList({
	todoList,
	onAddTodo,
	onToggleTodo,
	onDeleteTodo,
}: TaskTodoListProps) {
	const [newTodoText, setNewTodoText] = useState('')
	const [showAddForm, setShowAddForm] = useState(false)

	const handleAdd = () => {
		const text = newTodoText.trim()
		if (!text) return

		onAddTodo(text)
		setNewTodoText('')
		setShowAddForm(false)
	}

	const activeTodos = todoList.filter(t => !t.done)
	const completedTodos = todoList.filter(t => t.done)

	return (
		<div className='space-y-3'>
			<div className='flex items-center justify-between'>
				<Label className='flex items-center gap-2 text-sm font-semibold'>
					<CheckSquare className='h-4 w-4' />
					Заметки-тудулист ({activeTodos.length})
				</Label>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-7 text-xs'
					onClick={() => setShowAddForm(!showAddForm)}
				>
					<Plus className='h-3 w-3 mr-1' />
					Добавить
				</Button>
			</div>

			{showAddForm && (
				<div className='p-3 rounded-lg border bg-muted/30 space-y-2'>
					<Input
						placeholder='Добавить заметку...'
						value={newTodoText}
						onChange={e => setNewTodoText(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault()
								handleAdd()
							}
						}}
						className='text-sm'
						autoFocus
					/>
					<div className='flex gap-2'>
						<Button
							type='button'
							variant='ghost'
							size='sm'
							className='h-7 text-xs'
							onClick={() => {
								setShowAddForm(false)
								setNewTodoText('')
							}}
						>
							Отмена
						</Button>
						<Button
							type='button'
							size='sm'
							className='h-7 text-xs'
							onClick={handleAdd}
							disabled={!newTodoText.trim()}
						>
							Добавить
						</Button>
					</div>
				</div>
			)}

			{activeTodos.length === 0 && completedTodos.length === 0 ? (
				<p className='text-xs text-muted-foreground text-center py-4'>
					Нет заметок
				</p>
			) : (
				<div className='space-y-2'>
					{/* Активные заметки */}
					{activeTodos.length > 0 && (
						<div className='space-y-2'>
							{activeTodos.map(todo => (
								<div
									key={todo.id}
									className='flex items-center gap-2 p-2 rounded-lg border bg-background hover:bg-muted/50 transition-colors group'
								>
									<button
										type='button'
										onClick={() => onToggleTodo(todo.id, !todo.done)}
										className={cn(
											'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
											todo.done
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-slate-300 bg-background hover:border-primary',
										)}
									>
										{todo.done ? (
											<Check className='h-3 w-3' strokeWidth={3} />
										) : null}
									</button>
									<p className='flex-1 text-sm text-slate-900'>{todo.text}</p>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
										onClick={() => onDeleteTodo(todo.id)}
									>
										<Trash2 className='h-3.5 w-3.5 text-red-500' />
									</Button>
								</div>
							))}
						</div>
					)}

					{/* Выполненные заметки */}
					{completedTodos.length > 0 && (
						<div className='pt-2 border-t'>
							<p className='text-[10px] text-muted-foreground mb-2'>
								Выполнено ({completedTodos.length})
							</p>
							<div className='space-y-1.5'>
								{completedTodos.map(todo => (
									<div
										key={todo.id}
										className='flex items-center gap-2 p-2 rounded-lg border bg-slate-50/50 border-slate-200 opacity-60 group'
									>
										<button
											type='button'
											onClick={() => onToggleTodo(todo.id, !todo.done)}
											className={cn(
												'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
												'border-primary bg-primary text-primary-foreground',
											)}
										>
											<Check className='h-3 w-3' strokeWidth={3} />
										</button>
										<p className='flex-1 text-sm text-slate-600 line-through'>
											{todo.text}
										</p>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
											onClick={() => onDeleteTodo(todo.id)}
										>
											<Trash2 className='h-3.5 w-3.5 text-red-500' />
										</Button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
