import {
	ArrowLeft,
	Calendar,
	Check,
	CheckSquare,
	CircleDollarSign,
	Mail,
	MessageCircle,
	Percent,
	Phone,
	Send,
	User,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import Layout from '@/shared/components/Layout'
import { UrlNames } from '@/shared/enums/UrlNames'
import { useKanbanTasksStore } from '@/shared/store/kanban-tasks'
import {
	taskChatMessages,
	type ColumnType,
	type Task,
	type WhatsAppMessage,
} from '@/shared/utils/moc-data'
import TaskActionLogs from '../components/TaskActionLogs'
import TaskNotes from '../components/TaskNotes'
import TaskQuickActions from '../components/TaskQuickActions'
import TaskReminders from '../components/TaskReminders'

const statusLabels: Record<Task['status'], string> = {
	new: 'Новый',
	contacted: 'Связались',
	agreed: 'Договорились',
	bought: 'Купил',
	refused: 'Отказ',
}

const statusColors: Record<Task['status'], string> = {
	new: 'bg-slate-100 text-slate-700 border-slate-200',
	contacted: 'bg-blue-100 text-blue-700 border-blue-200',
	agreed: 'bg-orange-100 text-orange-700 border-orange-200',
	bought: 'bg-emerald-100 text-emerald-700 border-emerald-200',
	refused: 'bg-red-100 text-red-700 border-red-200',
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

const clientStatusLabels: Record<string, string> = {
	active: 'Активен',
	pending: 'Ожидает',
	inactive: 'Неактивен',
	blocked: 'Заблокирован',
	refused: 'Отказ',
}

const clientStatusColors: Record<string, string> = {
	active: 'bg-green-100 text-green-700 border-green-200',
	pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
	inactive: 'bg-slate-100 text-slate-700 border-slate-200',
	blocked: 'bg-red-100 text-red-700 border-red-200',
	refused: 'bg-red-100 text-red-700 border-red-200',
}

export default function FunnelTaskDetailPage() {
	const { taskId } = useParams<{ taskId: string }>()
	const navigate = useNavigate()
	const {
		tasks,
		toggleChecklistItem,
		updateTask,
		addNote,
		addReminder,
		toggleReminder,
		addInternalMessage,
		addActionLog,
	} = useKanbanTasksStore()
	const [discountType, setDiscountType] = useState<'percent' | 'amount'>('percent')
	const [discountValue, setDiscountValue] = useState<string>('')
	const [chatMessage, setChatMessage] = useState<string>('')

	const currentUser = 'user1'
	const currentUserName = 'Текущий пользователь'
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const task = useMemo(
		() => tasks.find(t => String(t.id) === taskId),
		[taskId, tasks],
	)

	const whatsappMessages = useMemo(
		() => (taskId ? taskChatMessages[taskId] ?? [] : []),
		[taskId],
	)

	// Объединяем WhatsApp сообщения и внутренние сообщения CRM
	const allMessages = useMemo(() => {
		const whatsapp = whatsappMessages.map(msg => ({
			...msg,
			type: 'whatsapp' as const,
			timestamp: new Date().getTime(), // Временная метка для сортировки
		}))
		const internal = (task.internalMessages || []).map(msg => ({
			id: msg.id,
			text: msg.text,
			from: 'manager' as const,
			time: new Date(msg.createdAt).toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			}),
			type: 'internal' as const,
			userName: msg.userName,
			timestamp: new Date(msg.createdAt).getTime(),
		}))
		// Сортируем по времени (внутренние сообщения по дате создания, WhatsApp по порядку)
		return [...whatsapp, ...internal].sort((a, b) => {
			if (a.type === 'internal' && b.type === 'internal') {
				return a.timestamp - b.timestamp
			}
			if (a.type === 'whatsapp' && b.type === 'whatsapp') {
				return 0 // Сохраняем порядок WhatsApp сообщений
			}
			// Смешиваем типы - внутренние сообщения идут после WhatsApp
			return a.type === 'whatsapp' ? -1 : 1
		})
	}, [whatsappMessages, task.internalMessages])

	if (!task) {
		return <Navigate to={UrlNames.FUNNEL} replace />
	}

	const clientName = task.clientInfo?.name ?? task.title.split('—')[0]?.trim() ?? 'Клиент'

	// Расчет суммы из товаров
	const productsTotal = useMemo(() => {
		if (!task.products || task.products.length === 0) return 0
		return task.products.reduce((sum, p) => sum + p.price, 0)
	}, [task.products])

	// Расчет скидки
	const discountAmount = useMemo(() => {
		if (!task.discount) return 0
		if (task.discount.type === 'percent') {
			return (productsTotal * task.discount.value) / 100
		}
		return task.discount.value
	}, [task.discount, productsTotal])

	const finalTotal = productsTotal - discountAmount

	// Форматирование суммы
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumFractionDigits: 0,
		}).format(value)
	}

	const handleSaveDiscount = () => {
		const numValue = parseFloat(discountValue)
		if (isNaN(numValue) || numValue < 0) {
			setDiscountValue('')
			return
		}

		updateTask(task.id, {
			discount: {
				type: discountType,
				value: numValue,
			},
		})

		setDiscountValue('')
	}

	useEffect(() => {
		if (task.discount) {
			setDiscountType(task.discount.type)
			setDiscountValue(String(task.discount.value))
		} else {
			setDiscountValue('')
		}
	}, [task.discount])

	const renderAssignee = () => {
		const name = task.assigneeName ?? 'Менеджер'
		if (task.assignee?.startsWith('http')) {
			return (
				<div className='flex items-center gap-3'>
					<img
						src={task.assignee}
						alt={name}
						className='h-10 w-10 rounded-full object-cover border-2 border-border'
					/>
					<div>
						<p className='text-sm font-medium'>{name}</p>
						<p className='text-xs text-muted-foreground'>Прикреплённый менеджер</p>
					</div>
				</div>
			)
		}
		return (
			<div className='flex items-center gap-3'>
				<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary border border-primary/20'>
					{task.assignee ?? name.slice(0, 2)}
				</div>
				<div>
					<p className='text-sm font-medium'>{name}</p>
					<p className='text-xs text-muted-foreground'>Прикреплённый менеджер</p>
				</div>
			</div>
		)
	}

	// Обработчики для быстрых действий
	const handleCall = () => {
		if (task.clientInfo?.phone) {
			window.open(`tel:${task.clientInfo.phone.replace(/\s/g, '')}`)
		}
		addActionLog(task.id, {
			action: 'Звонок клиенту',
			userId: currentUser,
			userName: currentUserName,
		})
	}

	const handleMessage = () => {
		// Можно открыть WhatsApp или другой мессенджер
		if (task.clientInfo?.phone) {
			window.open(`https://wa.me/${task.clientInfo.phone.replace(/\D/g, '')}`)
		}
		addActionLog(task.id, {
			action: 'Отправлено сообщение клиенту',
			userId: currentUser,
			userName: currentUserName,
		})
	}

	const handleAddReminder = () => {
		// Открытие формы напоминания будет обработано компонентом TaskReminders
	}

	const handleMoveToStatus = (status: ColumnType) => {
		updateTask(task.id, { status })
		addActionLog(task.id, {
			action: `Изменен статус на "${statusLabels[status]}"`,
			userId: currentUser,
			userName: currentUserName,
			details: `${task.status} -> ${status}`,
		})
	}

	const handleRefuse = (comment: string) => {
		updateTask(task.id, {
			status: 'refused',
			refusalComment: comment,
		})
		addActionLog(task.id, {
			action: 'Сделка переведена в отказ',
			userId: currentUser,
			userName: currentUserName,
			details: comment,
		})
	}

	const handleSetStatusFlag = (flag: Task['statusFlags']) => {
		updateTask(task.id, { statusFlags: flag })
		addActionLog(task.id, {
			action: 'Установлен флажок статуса',
			userId: currentUser,
			userName: currentUserName,
			details: flag?.type || 'none',
		})
	}

	const handleAddNote = (text: string, isPersonal: boolean) => {
		addNote(task.id, {
			text,
			isPersonal,
			createdBy: currentUserName,
		})
		addActionLog(task.id, {
			action: isPersonal ? 'Добавлена личная заметка' : 'Добавлена заметка',
			userId: currentUser,
			userName: currentUserName,
		})
	}

	const handleAddReminderAction = (reminder: Omit<NonNullable<Task['reminders']>[0], 'id'>) => {
		addReminder(task.id, reminder)
		addActionLog(task.id, {
			action: 'Добавлено напоминание',
			userId: currentUser,
			userName: currentUserName,
			details: `${reminder.title} на ${reminder.date} ${reminder.time}`,
		})
	}

	const handleToggleReminder = (reminderId: string) => {
		toggleReminder(task.id, reminderId)
		const reminder = task.reminders?.find(r => r.id === reminderId)
		if (reminder) {
			addActionLog(task.id, {
				action: reminder.completed
					? 'Напоминание активировано'
					: 'Напоминание выполнено',
				userId: currentUser,
				userName: currentUserName,
			})
		}
	}

	const handleSendInternalMessage = (text: string) => {
		addInternalMessage(task.id, {
			text,
			userId: currentUser,
			userName: currentUserName,
		})
		addActionLog(task.id, {
			action: 'Отправлено сообщение в чат',
			userId: currentUser,
			userName: currentUserName,
		})
	}

	const handleSendChatMessage = () => {
		const text = chatMessage.trim()
		if (!text) return

		handleSendInternalMessage(text)
		setChatMessage('')
		// Автоскролл вниз после отправки
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 100)
	}

	// Автоскролл при изменении сообщений
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [allMessages.length])

	return (
		<Layout>
			<div className='flex flex-col h-full min-h-0 p-4'>
				{/* Кнопка назад */}
				<div className='mb-4'>
					<Button
						variant='ghost'
						size='sm'
						className='gap-2 text-muted-foreground hover:text-foreground'
						onClick={() => navigate(UrlNames.FUNNEL)}
					>
						<ArrowLeft className='h-4 w-4' />
						Назад к воронке
					</Button>
				</div>

				{/* Верхний заголовок */}
				<h1 className='text-2xl font-bold tracking-tight text-slate-900 mb-4'>
					{task.title}
				</h1>

				{/* Основной контент: чат слева, вся детальная информация только справа */}
				<div className='flex flex-col lg:flex-row gap-4 flex-1 min-h-0'>
					{/* Левая колонка — WhatsApp переписка (растягивается) */}
					<Card className='flex-1 min-w-0 flex flex-col min-h-[400px] lg:min-h-0 overflow-hidden'>
						<CardHeader className='flex-none py-3 px-4 border-b bg-[#e5ddd5] rounded-t-lg'>
							<div className='flex items-center gap-3'>
								<Button
									variant='ghost'
									size='icon'
									className='lg:hidden h-8 w-8'
									onClick={() => navigate(UrlNames.FUNNEL)}
								>
									<ArrowLeft className='h-4 w-4' />
								</Button>
								<div className='flex items-center gap-3 flex-1 min-w-0'>
									<div className='h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center'>
										<MessageCircle className='h-5 w-5 text-white' />
									</div>
									<div className='min-w-0'>
										<CardTitle className='text-base font-semibold text-slate-800 truncate'>
											{clientName}
										</CardTitle>
										<p className='text-xs text-emerald-700 font-medium'>
											WhatsApp
										</p>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className='flex-1 overflow-y-auto p-4 bg-[#e5ddd5] space-y-3 shadcn-scrollbar flex flex-col min-h-0'>
							{/* Сообщения */}
							<div className='flex-1 overflow-y-auto space-y-3'>
								{allMessages.length === 0 ? (
									<div className='flex flex-col items-center justify-center py-12 text-center text-muted-foreground'>
										<MessageCircle className='h-12 w-12 mb-2 opacity-50' />
										<p className='text-sm'>Нет сообщений</p>
									</div>
								) : (
									<>
										{allMessages.map((msg: any) => {
											const isInternal = msg.type === 'internal'
											const isManager = msg.from === 'manager'

											return (
												<div
													key={msg.id}
													className={cn(
														'flex',
														isManager ? 'justify-end' : 'justify-start',
													)}
												>
													<div
														className={cn(
															'max-w-[85%] rounded-lg px-3 py-2 shadow-sm',
															isInternal
																? isManager
																	? 'bg-blue-100 text-slate-900 border border-blue-300'
																	: 'bg-blue-50 text-slate-900 border border-blue-200'
																: isManager
																	? 'bg-[#dcf8c6] text-slate-900'
																	: 'bg-white text-slate-900',
														)}
													>
														{isInternal && (
															<p className='text-[10px] font-semibold text-blue-700 mb-1 flex items-center gap-1'>
																<span className='inline-block w-1.5 h-1.5 rounded-full bg-blue-500'></span>
																{msg.userName || 'Менеджер'} (CRM)
															</p>
														)}
														<p className='text-sm whitespace-pre-wrap'>{msg.text}</p>
														<p
															className={cn(
																'text-[10px] mt-1',
																isManager
																	? 'text-slate-500 text-right'
																	: 'text-slate-500',
															)}
														>
															{msg.time}
														</p>
													</div>
												</div>
											)
										})}
										<div ref={messagesEndRef} />
									</>
								)}
							</div>

							{/* Поле ввода сообщения */}
							<div className='flex-none pt-3 border-t border-slate-300'>
								<div className='flex gap-2 items-end'>
									<div className='flex-1 bg-white rounded-lg border border-slate-300 overflow-hidden flex items-center'>
										<textarea
											placeholder='Написать сообщение...'
											value={chatMessage}
											onChange={e => setChatMessage(e.target.value)}
											onKeyDown={e => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault()
													handleSendChatMessage()
												}
											}}
											className='flex-1 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-0 min-h-[40px] max-h-[120px]'
											rows={1}
											style={{
												height: 'auto',
											}}
											onInput={e => {
												const target = e.target as HTMLTextAreaElement
												target.style.height = 'auto'
												target.style.height = `${Math.min(target.scrollHeight, 120)}px`
											}}
										/>
									</div>
									<Button
										type='button'
										size='icon'
										className='h-10 w-10 shrink-0 bg-emerald-500 hover:bg-emerald-600 rounded-full'
										onClick={handleSendChatMessage}
										disabled={!chatMessage.trim()}
									>
										<Send className='h-5 w-5 text-white' />
									</Button>
								</div>
								<p className='text-[10px] text-slate-500 mt-1 px-1'>
									Сообщения отправляются в систему CRM
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Правая колонка — только детальная информация + информация о продаже (фиксированная ширина, не уходит вниз) */}
					<aside className='w-full lg:w-[380px] lg:shrink-0 flex flex-col gap-4 overflow-y-auto shadcn-scrollbar'>
						{/* Информация о клиенте */}
						{task.clientInfo && (
							<Card className='flex-shrink-0'>
								<CardHeader className='py-3'>
									<CardTitle className='text-base'>Информация о клиенте</CardTitle>
								</CardHeader>
								<CardContent className='space-y-3'>
									<div>
										<p className='text-xs font-medium text-muted-foreground mb-1'>
											Имя
										</p>
										<p className='text-sm font-medium flex items-center gap-2'>
											<User className='h-4 w-4 text-muted-foreground' />
											{task.clientInfo.name}
										</p>
									</div>
									{task.clientInfo.phone && (
										<div>
											<p className='text-xs font-medium text-muted-foreground mb-1'>
												Телефон
											</p>
											<p className='text-sm font-medium flex items-center gap-2'>
												<Phone className='h-4 w-4 text-muted-foreground' />
												{task.clientInfo.phone}
											</p>
										</div>
									)}
									{task.clientInfo.email && (
										<div>
											<p className='text-xs font-medium text-muted-foreground mb-1'>
												Email
											</p>
											<p className='text-sm font-medium flex items-center gap-2'>
												<Mail className='h-4 w-4 text-muted-foreground' />
												{task.clientInfo.email}
											</p>
										</div>
									)}
									{task.clientStatus && (
										<div>
											<p className='text-xs font-medium text-muted-foreground mb-1'>
												Статус клиента
											</p>
											<span
												className={cn(
													'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border',
													clientStatusColors[task.clientStatus] ||
														'bg-slate-100 text-slate-700 border-slate-200',
												)}
											>
												{clientStatusLabels[task.clientStatus] || task.clientStatus}
											</span>
										</div>
									)}
									{task.interactionHistory && task.interactionHistory.length > 0 && (
										<div>
											<p className='text-xs font-medium text-muted-foreground mb-2'>
												История взаимодействий ({task.interactionHistory.length})
											</p>
											<div className='space-y-1.5 max-h-32 overflow-y-auto shadcn-scrollbar'>
												{task.interactionHistory.map(ih => (
													<div
														key={ih.id}
														className='p-2 rounded border bg-muted/30 text-xs'
													>
														<div className='flex items-center justify-between mb-1'>
															<span className='font-medium'>{ih.type}</span>
															<span className='text-[10px] text-muted-foreground'>
																{new Date(ih.date).toLocaleDateString('ru-RU')}
															</span>
														</div>
														<p className='text-[10px] text-slate-600'>{ih.description}</p>
														{ih.manager && (
															<p className='text-[10px] text-muted-foreground mt-1'>
																{ih.manager}
															</p>
														)}
													</div>
												))}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						)}

						{/* Кнопки быстрых действий */}
						<Card className='flex-shrink-0'>
							<CardHeader className='py-3'>
								<CardTitle className='text-base'>Быстрые действия</CardTitle>
							</CardHeader>
							<CardContent>
								<TaskQuickActions
									task={task}
									onCall={handleCall}
									onMessage={handleMessage}
									onAddReminder={handleAddReminder}
									onMoveToStatus={handleMoveToStatus}
									onRefuse={handleRefuse}
									onSetStatusFlag={handleSetStatusFlag}
								/>
							</CardContent>
						</Card>

						{/* Заметки */}
						<Card className='flex-shrink-0'>
							<CardHeader className='py-3'>
								<CardTitle className='text-base'>Заметки</CardTitle>
							</CardHeader>
							<CardContent>
								<TaskNotes
									notes={task.notes || []}
									onAddNote={handleAddNote}
									currentUser={currentUserName}
								/>
							</CardContent>
						</Card>

						{/* Напоминания */}
						<Card className='flex-shrink-0'>
							<CardHeader className='py-3'>
								<CardTitle className='text-base'>Напоминания</CardTitle>
							</CardHeader>
							<CardContent>
								<TaskReminders
									reminders={task.reminders || []}
									onAddReminder={handleAddReminderAction}
									onToggleReminder={handleToggleReminder}
									currentUser={currentUserName}
								/>
							</CardContent>
						</Card>

						{/* История действий */}
						{task.actionLogs && task.actionLogs.length > 0 && (
							<Card className='flex-shrink-0'>
								<CardHeader className='py-3'>
									<CardTitle className='text-base'>История действий</CardTitle>
								</CardHeader>
								<CardContent>
									<TaskActionLogs logs={task.actionLogs} />
								</CardContent>
							</Card>
						)}

						<Card className='flex-shrink-0'>
							<CardHeader className='py-3'>
								<CardTitle className='text-base'>Детальная информация</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								{task.description && (
									<div>
										<p className='text-xs font-medium text-muted-foreground mb-1'>
											Описание
										</p>
										<p className='text-sm text-slate-700'>{task.description}</p>
									</div>
								)}
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Приоритет
									</p>
									<span
										className={cn(
											'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
											task.priority === 'high'
												? 'bg-red-50 text-red-700 border-red-200'
												: task.priority === 'medium'
													? 'bg-yellow-50 text-yellow-700 border-yellow-200'
													: 'bg-slate-100 text-slate-600 border-slate-200',
										)}
									>
										{task.priority === 'high'
											? 'Срочно'
											: task.priority === 'medium'
												? 'В графике'
												: 'Низкий'}
									</span>
								</div>
								<div className='space-y-2'>
									<div className='flex items-center gap-2'>
										<CheckSquare className='h-4 w-4 text-muted-foreground' />
										<span className='text-sm'>
											Чек-лист: {task.checklist.filter(c => c.done).length} / {task.checklist.length}
										</span>
									</div>
									{task.checklist.length > 0 && (
										<ul className='space-y-1.5'>
											{task.checklist.map(item => (
												<li
													key={item.id}
													className='flex items-center gap-2 text-sm cursor-pointer'
													onClick={() => toggleChecklistItem(task.id, item.id, !item.done)}
												>
													<span
														className={cn(
															'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
															item.done
																? 'border-primary bg-primary text-primary-foreground'
																: 'border-slate-300 bg-background',
														)}
													>
														{item.done ? <Check className='h-2.5 w-2.5' strokeWidth={3} /> : null}
													</span>
													<span
														className={cn(
															'flex-1',
															item.done && 'line-through text-slate-400',
														)}
													>
														{item.text}
													</span>
												</li>
											))}
										</ul>
									)}
								</div>
								<div className='flex items-center gap-2'>
									<Calendar className='h-4 w-4 text-muted-foreground' />
									<span className='text-sm'>{task.dateRange}</span>
								</div>
								<div className='flex items-center gap-2'>
									<CircleDollarSign className='h-4 w-4 text-muted-foreground' />
									<span className='text-sm font-medium'>{task.budget}</span>
								</div>
							</CardContent>
						</Card>

						<Card className='flex-shrink-0'>
							<CardHeader className='py-3'>
								<CardTitle className='text-base'>Информация о продаже</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Дата добавления
									</p>
									<p className='text-sm font-medium flex items-center gap-2'>
										<Calendar className='h-4 w-4 text-muted-foreground' />
										{formatDate(task.dateAdded)}
									</p>
								</div>
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Дедлайн
									</p>
									<p className='text-sm font-medium flex items-center gap-2'>
										<Calendar className='h-4 w-4 text-muted-foreground' />
										{formatDate(task.deadline)}
									</p>
								</div>
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Статус
									</p>
									<span
										className={cn(
											'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border',
											statusColors[task.status],
										)}
									>
										{statusLabels[task.status]}
									</span>
								</div>
								{/* Расчет суммы из товаров */}
								{task.products && task.products.length > 0 && (
									<div className='space-y-2 p-3 rounded-lg bg-muted/30 border'>
										<div>
											<p className='text-xs font-medium text-muted-foreground mb-1'>
												Сумма товаров
											</p>
											<p className='text-base font-bold flex items-center gap-2'>
												<CircleDollarSign className='h-4 w-4 text-muted-foreground' />
												{formatCurrency(productsTotal)}
											</p>
										</div>

										{/* Скидка */}
										<div className='space-y-2 pt-2 border-t border-border'>
											<p className='text-xs font-medium text-muted-foreground'>
												Скидка
											</p>
											<div className='flex gap-2'>
												<Select
													value={discountType}
													onValueChange={v => {
														setDiscountType(v as 'percent' | 'amount')
														setDiscountValue('')
													}}
												>
													<SelectTrigger className='w-[120px] h-8 text-xs'>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='percent'>Проценты</SelectItem>
														<SelectItem value='amount'>Сомы</SelectItem>
													</SelectContent>
												</Select>
												<Input
													type='number'
													placeholder={discountType === 'percent' ? '0-100' : '0'}
													value={discountValue}
													onChange={e => setDiscountValue(e.target.value)}
													className='h-8 text-xs'
													max={discountType === 'percent' ? 100 : undefined}
													min={0}
												/>
												<Button
													type='button'
													size='sm'
													className='h-8 text-xs'
													onClick={handleSaveDiscount}
													disabled={!discountValue || parseFloat(discountValue) < 0}
												>
													Сохранить
												</Button>
											</div>
											{task.discount && (
												<div className='flex items-center gap-2 text-xs text-muted-foreground'>
													<Percent className='h-3 w-3' />
													<span>
														{task.discount.type === 'percent'
															? `${task.discount.value}%`
															: `${formatCurrency(task.discount.value)}`}
														{' = '}
														{formatCurrency(discountAmount)}
													</span>
												</div>
											)}
										</div>

										{/* Итоговая сумма */}
										<div className='pt-2 border-t border-border'>
											<p className='text-xs font-medium text-muted-foreground mb-1'>
												Итого
											</p>
											<p className='text-lg font-bold text-primary flex items-center gap-2'>
												<CircleDollarSign className='h-5 w-5' />
												{formatCurrency(finalTotal)}
											</p>
										</div>
									</div>
								)}

								{(!task.products || task.products.length === 0) && (
									<div>
										<p className='text-xs font-medium text-muted-foreground mb-1'>
											Сумма
										</p>
										<p className='text-sm font-medium flex items-center gap-2'>
											<CircleDollarSign className='h-4 w-4 text-muted-foreground' />
											{task.budget}
										</p>
									</div>
								)}
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Название
									</p>
									<p className='text-sm font-medium'>{task.title}</p>
								</div>
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Менеджер
									</p>
									{renderAssignee()}
								</div>
								{task.products && task.products.length > 0 && (
									<div>
										<p className='text-xs font-medium text-muted-foreground mb-2'>
											Товары ({task.products.length})
										</p>
										<div className='space-y-2'>
											{task.products.map(product => (
												<div
													key={product.id}
													className='p-2.5 rounded-lg bg-muted/50 border border-border hover:bg-muted/70 transition-colors'
												>
													<div className='flex items-start justify-between gap-2'>
														<div className='flex-1 min-w-0'>
															<p className='text-sm font-medium text-slate-900 truncate'>
																{product.name}
															</p>
															<div className='flex items-center gap-2 mt-1'>
																<span className='inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200'>
																	{product.category}
																</span>
																<span className='text-xs text-muted-foreground'>
																	{new Intl.NumberFormat('ru-RU', {
																		style: 'currency',
																		currency: 'RUB',
																		maximumFractionDigits: 0,
																	}).format(product.price)}
																</span>
															</div>
														</div>
														{product.is_active ? (
															<span className='inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 border border-green-200 shrink-0'>
																Активен
															</span>
														) : (
															<span className='inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 shrink-0'>
																Архив
															</span>
														)}
													</div>
												</div>
											))}
										</div>
									</div>
								)}
								{task.clientInfo && (
									<div>
										<p className='text-xs font-medium text-muted-foreground mb-2'>
											Информация о клиенте
										</p>
										<div className='flex flex-col gap-2 p-3 rounded-lg bg-muted/50 border'>
											<div className='flex items-center gap-2'>
												<User className='h-4 w-4 text-muted-foreground shrink-0' />
												<span className='text-sm'>{task.clientInfo.name}</span>
											</div>
											<div className='flex items-center gap-2'>
												<Phone className='h-4 w-4 text-muted-foreground shrink-0' />
												<a
													href={`tel:${task.clientInfo.phone}`}
													className='text-sm text-primary hover:underline'
												>
													{task.clientInfo.phone}
												</a>
											</div>
											<div className='flex items-center gap-2'>
												<Mail className='h-4 w-4 text-muted-foreground shrink-0' />
												<a
													href={`mailto:${task.clientInfo.email}`}
													className='text-sm text-primary hover:underline'
												>
													{task.clientInfo.email}
												</a>
											</div>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</aside>
				</div>
			</div>
		</Layout>
	)
}
