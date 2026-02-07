import {
	ArrowLeft,
	Calendar,
	Check,
	CheckSquare,
	CircleDollarSign,
	Mail,
	MessageCircle,
	Phone,
	User,
} from 'lucide-react'
import { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Layout from '@/shared/components/Layout'
import { UrlNames } from '@/shared/enums/UrlNames'
import { useKanbanTasksStore } from '@/shared/store/kanban-tasks'
import {
	taskChatMessages,
	type Task,
	type WhatsAppMessage,
} from '@/shared/utils/moc-data'

const statusLabels: Record<Task['status'], string> = {
	planned: 'В планах',
	in_progress: 'В работе',
	done: 'Выполнено',
}

const statusColors: Record<Task['status'], string> = {
	planned: 'bg-slate-100 text-slate-700 border-slate-200',
	in_progress: 'bg-orange-100 text-orange-700 border-orange-200',
	done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
}

export default function FunnelTaskDetailPage() {
	const { taskId } = useParams<{ taskId: string }>()
	const navigate = useNavigate()
	const { tasks, toggleChecklistItem } = useKanbanTasksStore()

	const task = useMemo(
		() => tasks.find(t => String(t.id) === taskId),
		[taskId, tasks],
	)

	const messages = useMemo(
		() => (taskId ? taskChatMessages[taskId] ?? [] : []),
		[taskId],
	)

	if (!task) {
		return <Navigate to={UrlNames.FUNNEL} replace />
	}

	const clientName = task.clientInfo?.name ?? task.title.split('—')[0]?.trim() ?? 'Клиент'

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
						<CardContent className='flex-1 overflow-y-auto p-4 bg-[#e5ddd5] space-y-3 shadcn-scrollbar'>
							{messages.length === 0 ? (
								<div className='flex flex-col items-center justify-center py-12 text-center text-muted-foreground'>
									<MessageCircle className='h-12 w-12 mb-2 opacity-50' />
									<p className='text-sm'>Нет сообщений</p>
								</div>
							) : (
								messages.map((msg: WhatsAppMessage) => (
									<div
										key={msg.id}
										className={cn(
											'flex',
											msg.from === 'manager' ? 'justify-end' : 'justify-start',
										)}
									>
										<div
											className={cn(
												'max-w-[85%] rounded-lg px-3 py-2 shadow-sm',
												msg.from === 'manager'
													? 'bg-[#dcf8c6] text-slate-900'
													: 'bg-white text-slate-900',
											)}
										>
											<p className='text-sm whitespace-pre-wrap'>{msg.text}</p>
											<p
												className={cn(
													'text-[10px] mt-1',
													msg.from === 'manager'
														? 'text-slate-500 text-right'
														: 'text-slate-500',
												)}
											>
												{msg.time}
											</p>
										</div>
									</div>
								))
							)}
						</CardContent>
					</Card>

					{/* Правая колонка — только детальная информация + информация о продаже (фиксированная ширина, не уходит вниз) */}
					<aside className='w-full lg:w-[380px] lg:shrink-0 flex flex-col gap-4 overflow-y-auto shadcn-scrollbar'>
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
								<div>
									<p className='text-xs font-medium text-muted-foreground mb-1'>
										Сумма
									</p>
									<p className='text-sm font-medium flex items-center gap-2'>
										<CircleDollarSign className='h-4 w-4 text-muted-foreground' />
										{task.budget}
									</p>
								</div>
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
