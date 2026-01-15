import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar' // Импорт календаря
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover' // Импорт поповера
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from '@/components/ui/shadcn-io/kanban'
import { cn } from '@/lib/utils' // Утилита для классов
import { faker } from '@faker-js/faker'
import { format, isPast, isToday } from 'date-fns' // Утилиты времени
import { ru } from 'date-fns/locale' // Русская локаль для календаря
import { CalendarIcon, Clock, Plus } from 'lucide-react'
import { useState } from 'react'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

// --- Данные ---
const columns = [
	{ id: 'planned', name: 'В планах', color: '#6B7280' },
	{ id: 'in-progress', name: 'В работе', color: '#F59E0B' },
	{ id: 'done', name: 'Готово', color: '#10B981' },
]

const users = Array.from({ length: 4 })
	.fill(null)
	.map(() => ({
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		image: faker.image.avatar(),
	}))

const exampleFeatures = Array.from({ length: 4 })
	.fill(null)
	.map(() => ({
		id: faker.string.uuid(),
		name: capitalize(faker.company.buzzPhrase()),
		startAt: faker.date.past({ years: 0.1 }),
		endAt: faker.date.future({ years: 0.1 }), // Дедлайн
		column: faker.helpers.arrayElement(columns).id,
		owner: faker.helpers.arrayElement(users),
	}))

const KanbanTable = () => {
	const [features, setFeatures] = useState(exampleFeatures)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	// --- Состояние формы ---
	const [newTaskName, setNewTaskName] = useState('')
	const [selectedColumn, setSelectedColumn] = useState(columns[0].id)
	const [selectedOwner, setSelectedOwner] = useState<string>(users[0].id)
	const [date, setDate] = useState<Date | undefined>(new Date()) // Состояние для даты

	// --- Добавление задачи ---
	const handleAddTask = () => {
		if (!newTaskName.trim()) return

		const owner = users.find(u => u.id === selectedOwner) || users[0]

		// Если дата не выбрана, ставим завтрашний день по умолчанию
		const deadline =
			date || new Date(new Date().setDate(new Date().getDate() + 1))

		const newTask = {
			id: faker.string.uuid(),
			name: capitalize(newTaskName),
			startAt: new Date(),
			endAt: deadline,
			column: selectedColumn,
			owner: owner,
		}

		setFeatures(prev => [...prev, newTask])

		// Сброс формы
		setNewTaskName('')
		setDate(new Date())
		setIsDialogOpen(false)
	}

	return (
		<div className='flex flex-col h-full gap-4'>
			<div className='flex items-center justify-between px-2'>
				<h2 className='text-2xl font-bold tracking-tight'>Задачи проекта</h2>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='mr-2 h-4 w-4' /> Новая задача
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[500px]'>
						<DialogHeader>
							<DialogTitle>Создать задачу</DialogTitle>
							<DialogDescription>
								Укажите название, исполнителя и срок выполнения.
							</DialogDescription>
						</DialogHeader>

						<div className='grid gap-5 py-4'>
							{/* Название */}
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='name' className='text-right'>
									Задача
								</Label>
								<Input
									id='name'
									value={newTaskName}
									onChange={e => setNewTaskName(e.target.value)}
									placeholder='Например: Сверстать хедер...'
									className='col-span-3'
								/>
							</div>

							{/* Статус */}
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='column' className='text-right'>
									Статус
								</Label>
								<Select
									value={selectedColumn}
									onValueChange={setSelectedColumn}
								>
									<SelectTrigger className='col-span-3'>
										<SelectValue placeholder='Выберите статус' />
									</SelectTrigger>
									<SelectContent>
										{columns.map(col => (
											<SelectItem key={col.id} value={col.id}>
												{col.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Исполнитель */}
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label htmlFor='owner' className='text-right'>
									Исполнитель
								</Label>
								<Select value={selectedOwner} onValueChange={setSelectedOwner}>
									<SelectTrigger className='col-span-3'>
										<SelectValue placeholder='Выберите исполнителя' />
									</SelectTrigger>
									<SelectContent>
										{users.map(user => (
											<SelectItem key={user.id} value={user.id}>
												<div className='flex items-center gap-2'>
													<Avatar className='h-5 w-5'>
														<AvatarImage src={user.image} />
														<AvatarFallback>{user.name[0]}</AvatarFallback>
													</Avatar>
													{user.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* DATE PICKER (Выбор дедлайна) */}
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Дедлайн</Label>
								<div className='col-span-3'>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={cn(
													'w-full justify-start text-left font-normal',
													!date && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{date ? (
													format(date, 'd MMMM yyyy', { locale: ru })
												) : (
													<span>Выберите дату</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='start'>
											<Calendar
												mode='single'
												selected={date}
												onSelect={setDate}
												initialFocus
												locale={ru} // Русская локализация календаря
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>

						<DialogFooter>
							<Button type='submit' onClick={handleAddTask}>
								Сохранить
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<div className='flex-1 overflow-x-auto'>
				<KanbanProvider
					columns={columns}
					data={features}
					onDataChange={setFeatures}
				>
					{column => (
						<KanbanBoard id={column.id} key={column.id}>
							<KanbanHeader>
								<div className='flex items-center gap-2'>
									<div
										className='h-2 w-2 rounded-full'
										style={{ backgroundColor: column.color }}
									/>
									<span className='font-semibold'>{column.name}</span>
									<span className='ml-auto text-xs text-muted-foreground font-medium bg-secondary px-2 py-0.5 rounded-full'>
										{features.filter(f => f.column === column.id).length}
									</span>
								</div>
							</KanbanHeader>
							<KanbanCards id={column.id}>
								{(feature: (typeof features)[number]) => {
									// Проверка на просрочку
									const isOverdue =
										isPast(feature.endAt) && !isToday(feature.endAt)
									const isDueToday = isToday(feature.endAt)

									return (
										<KanbanCard
											column={column.id}
											id={feature.id}
											key={feature.id}
											name={feature.name}
										>
											<div className='flex items-start justify-between gap-2 mb-2'>
												<div className='flex flex-col gap-1'>
													<p className='m-0 flex-1 font-medium text-sm leading-tight text-slate-900'>
														{feature.name}
													</p>
												</div>
												{feature.owner && (
													<Avatar className='h-6 w-6 shrink-0 border border-background'>
														<AvatarImage src={feature.owner.image} />
														<AvatarFallback>
															{feature.owner.name?.slice(0, 2)}
														</AvatarFallback>
													</Avatar>
												)}
											</div>

											{/* Футер карточки с датой */}
											<div className='flex items-center justify-between pt-2 border-t border-slate-100 mt-2'>
												<div
													className={cn(
														'flex items-center gap-1.5 text-[10px] font-medium px-2 py-1 rounded-md transition-colors',
														isOverdue
															? 'bg-red-100 text-red-700'
															: isDueToday
															? 'bg-orange-100 text-orange-700'
															: 'bg-slate-100 text-slate-500'
													)}
												>
													<Clock className='w-3 h-3' />
													<span>
														{format(feature.endAt, 'd MMM', { locale: ru })}
													</span>
												</div>
											</div>
										</KanbanCard>
									)
								}}
							</KanbanCards>
						</KanbanBoard>
					)}
				</KanbanProvider>
			</div>
		</div>
	)
}

export default KanbanTable
