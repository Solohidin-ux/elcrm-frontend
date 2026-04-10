import { Bell, Check, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Reminder } from '@/shared/utils/moc-data'

interface TaskRemindersProps {
	reminders: Reminder[]
	onAddReminder: (reminder: Omit<Reminder, 'id'>) => void
	onToggleReminder: (reminderId: string) => void
	currentUser: string
}

export default function TaskReminders({
	reminders,
	onAddReminder,
	onToggleReminder,
	currentUser,
}: TaskRemindersProps) {
	const [showAddForm, setShowAddForm] = useState(false)
	const [title, setTitle] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')

	const handleAdd = () => {
		if (!title.trim() || !date || !time) return

		onAddReminder({
			title: title.trim(),
			date,
			time,
			completed: false,
			createdBy: currentUser,
		})

		setTitle('')
		setDate('')
		setTime('')
		setShowAddForm(false)
	}

	const activeReminders = reminders.filter(r => !r.completed)
	const completedReminders = reminders.filter(r => r.completed)

	return (
		<div className='space-y-3'>
			<div className='flex items-center justify-between'>
				<Label className='flex items-center gap-2 text-sm font-semibold'>
					<Bell className='h-4 w-4' />
					Напоминания ({activeReminders.length})
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
						placeholder='Название напоминания...'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='text-sm'
					/>
					<div className='grid grid-cols-2 gap-2'>
						<div>
							<Label className='text-xs'>Дата</Label>
							<Input
								type='date'
								value={date}
								onChange={e => setDate(e.target.value)}
								className='h-8 text-xs'
							/>
						</div>
						<div>
							<Label className='text-xs'>Время</Label>
							<Input
								type='time'
								value={time}
								onChange={e => setTime(e.target.value)}
								className='h-8 text-xs'
							/>
						</div>
					</div>
					<div className='flex gap-2'>
						<Button
							type='button'
							variant='ghost'
							size='sm'
							className='h-7 text-xs'
							onClick={() => {
								setShowAddForm(false)
								setTitle('')
								setDate('')
								setTime('')
							}}
						>
							Отмена
						</Button>
						<Button
							type='button'
							size='sm'
							className='h-7 text-xs'
							onClick={handleAdd}
							disabled={!title.trim() || !date || !time}
						>
							Сохранить
						</Button>
					</div>
				</div>
			)}

			{activeReminders.length === 0 && completedReminders.length === 0 ? (
				<p className='text-xs text-muted-foreground text-center py-4'>
					Нет напоминаний
				</p>
			) : (
				<div className='space-y-2 max-h-64 overflow-y-auto shadcn-scrollbar'>
					{activeReminders.map(reminder => {
						const reminderDate = new Date(`${reminder.date}T${reminder.time}`)
						const isOverdue = reminderDate < new Date() && !reminder.completed

						return (
							<div
								key={reminder.id}
								className={cn(
									'p-2.5 rounded-lg border text-sm flex items-center justify-between',
									isOverdue
										? 'bg-red-50/50 border-red-200'
										: 'bg-muted/50 border-border',
								)}
							>
								<div className='flex-1 min-w-0'>
									<div className='flex items-center gap-2'>
										<button
											type='button'
											onClick={() => onToggleReminder(reminder.id)}
											className={cn(
												'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
												reminder.completed
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-slate-300 bg-background hover:border-primary',
											)}
										>
											{reminder.completed ? (
												<Check className='h-2.5 w-2.5' strokeWidth={3} />
											) : null}
										</button>
										<p
											className={cn(
												'text-xs font-medium truncate',
												reminder.completed && 'line-through text-slate-400',
											)}
										>
											{reminder.title}
										</p>
									</div>
									<p className='text-[10px] text-muted-foreground mt-1 ml-6'>
										{reminderDate.toLocaleDateString('ru-RU', {
											day: 'numeric',
											month: 'short',
											hour: '2-digit',
											minute: '2-digit',
										})}
										{isOverdue && !reminder.completed && (
											<span className='text-red-600 ml-1'>• Просрочено</span>
										)}
									</p>
								</div>
							</div>
						)
					})}

					{completedReminders.length > 0 && (
						<div className='pt-2 border-t'>
							<p className='text-[10px] text-muted-foreground mb-2'>
								Выполненные ({completedReminders.length})
							</p>
							{completedReminders.map(reminder => (
								<div
									key={reminder.id}
									className='p-2 rounded-lg border bg-slate-50/50 border-slate-200 text-xs opacity-60'
								>
									<div className='flex items-center gap-2'>
										<Check className='h-3 w-3 text-green-600' />
										<span className='line-through'>{reminder.title}</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}
