import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CheckSquare, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { ChecklistItem, ColumnType, Task } from '@/shared/utils/moc-data'

interface KanbanAddTaskProps {
	onAddTask: (task: Omit<Task, 'id'>) => void
}

function KanbanAddTask({ onAddTask }: KanbanAddTaskProps) {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [budget, setBudget] = useState('')
	const [priority, setPriority] = useState<Task['priority']>('medium')
	const [status, setStatus] = useState<ColumnType>('new')
	const [description, setDescription] = useState('')
	const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
	const [newItemText, setNewItemText] = useState('')

	const addChecklistItem = () => {
		const text = newItemText.trim()
		if (!text) return
		setChecklistItems(prev => [
			...prev,
			{ id: `new-${Date.now()}`, text, done: false },
		])
		setNewItemText('')
	}

	const removeChecklistItem = (id: string) => {
		setChecklistItems(prev => prev.filter(item => item.id !== id))
	}

	const handleSubmit = () => {
		const trimmedTitle = title.trim()
		if (!trimmedTitle) return

		const now = new Date()
		const dateStr = now.toISOString().slice(0, 10)
		const fromNow = (d: Date, days: number) => {
			const x = new Date(d)
			x.setDate(x.getDate() + days)
			return x.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
		}

		onAddTask({
			title: trimmedTitle,
			budget: budget.trim() || '0 ₽',
			priority,
			status,
			description: description.trim() || undefined,
			dateRange: `${fromNow(now, 0)} - ${fromNow(now, 14)}`,
			dateAdded: dateStr,
			deadline: dateStr,
			checklist: checklistItems,
		})

		setOpen(false)
		setTitle('')
		setBudget('')
		setPriority('medium')
		setStatus('new')
		setDescription('')
		setChecklistItems([])
		setNewItemText('')
	}

	const handleOpenChange = (next: boolean) => {
		if (!next) {
			setTitle('')
			setBudget('')
			setPriority('medium')
			setStatus('new')
			setDescription('')
			setChecklistItems([])
			setNewItemText('')
		}
		setOpen(next)
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<button className='flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer'>
					<Plus size={16} />
					Новая задача
				</button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Создать задачу</DialogTitle>
					<DialogDescription>
						Добавьте новую задачу. Заполните поля и при необходимости добавьте
						пункты чек-листа.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-4 py-4'>
					<div className='flex flex-col gap-2'>
						<Label htmlFor='title'>Название</Label>
						<Input
							id='title'
							placeholder='Например: Разработка API'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<Label htmlFor='budget'>Бюджет</Label>
						<Input
							id='budget'
							placeholder='50 000 ₽'
							value={budget}
							onChange={e => setBudget(e.target.value)}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-2'>
							<Label>Приоритет</Label>
							<Select
								value={priority}
								onValueChange={v => setPriority(v as Task['priority'])}
							>
								<SelectTrigger className='w-full'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='low'>Низкий</SelectItem>
										<SelectItem value='medium'>Средний</SelectItem>
										<SelectItem value='high'>Высокий</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className='flex flex-col gap-2'>
							<Label>Статус</Label>
							<Select value={status} onValueChange={v => setStatus(v as ColumnType)}>
								<SelectTrigger className='w-full'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='new'>Новый</SelectItem>
										<SelectItem value='contacted'>Связались</SelectItem>
										<SelectItem value='agreed'>Договорились</SelectItem>
										<SelectItem value='bought'>Купил</SelectItem>
										<SelectItem value='refused'>Отказ</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<Label htmlFor='description'>Описание</Label>
						<Input
							id='description'
							placeholder='Краткое описание задачи'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</div>

					{/* Чек-лист в стиле Trello */}
					<div className='flex flex-col gap-2'>
						<Label className='flex items-center gap-2'>
							<CheckSquare className='h-4 w-4' />
							Чек-лист
						</Label>
						<div className='flex gap-2'>
							<Input
								placeholder='Добавить пункт...'
								value={newItemText}
								onChange={e => setNewItemText(e.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										e.preventDefault()
										addChecklistItem()
									}
								}}
							/>
							<Button
								type='button'
								variant='outline'
								size='icon'
								className='shrink-0'
								onClick={addChecklistItem}
								title='Добавить пункт'
							>
								<Plus className='h-4 w-4' />
							</Button>
						</div>
						{checklistItems.length > 0 && (
							<ul className='mt-2 space-y-2 rounded-md border bg-muted/30 p-2'>
								{checklistItems.map(item => (
									<li
										key={item.id}
										className='flex items-center gap-2 text-sm group'
									>
										<span className='h-4 w-4 shrink-0 rounded border border-slate-300 bg-background' />
										<span className='flex-1 truncate'>{item.text}</span>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='h-7 w-7 shrink-0 opacity-60 group-hover:opacity-100 text-destructive hover:text-destructive'
											onClick={() => removeChecklistItem(item.id)}
											title='Удалить пункт'
										>
											<Trash2 className='h-3.5 w-3.5' />
										</Button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<DialogFooter>
					<Button type='button' variant='outline' onClick={() => setOpen(false)}>
						Отмена
					</Button>
					<Button type='button' onClick={handleSubmit}>
						Создать задачу
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default KanbanAddTask
