import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import {
	AlertTriangle,
	Bell,
	CheckCircle,
	ChevronLeft,
	Info,
	MessageSquare,
	XCircle,
} from 'lucide-react'
import React, { useState } from 'react'
import { ActionBtn } from './ActionBtn'

// --- ТИПЫ И ДАННЫЕ ---
type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message'

interface Notification {
	id: string
	title: string
	description: string
	time: string
	read: boolean
	type: NotificationType
}

const mockNotificationsData: Notification[] = [
	{
		id: '1',
		title: 'Заказ успешно оплачен',
		description: 'Заказ #4230 был оплачен клиентом через Stripe.',
		time: '2 мин. назад',
		read: false,
		type: 'success',
	},
	{
		id: '2',
		title: 'Новое сообщение',
		description: 'Алексей отправил вам сообщение по поводу проекта "CRM".',
		time: '1 час назад',
		read: false,
		type: 'message',
	},
	{
		id: '3',
		title: 'Системное обновление',
		description: 'Сервер будет перезагружен сегодня в 03:00 ночи.',
		time: '5 часов назад',
		read: true,
		type: 'info',
	},
	{
		id: '4',
		title: 'Лимит хранилища',
		description: 'Ваше хранилище заполнено на 90%. Освободите место.',
		time: '1 день назад',
		read: true,
		type: 'warning',
	},
	{
		id: '5',
		title: 'Ошибка синхронизации',
		description: 'Не удалось синхронизировать данные с Google Calendar.',
		time: '2 дня назад',
		read: true,
		type: 'error',
	},
]

const iconMap = {
	info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-100' },
	success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
	warning: {
		icon: AlertTriangle,
		color: 'text-orange-600',
		bg: 'bg-orange-100',
	},
	error: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
	message: {
		icon: MessageSquare,
		color: 'text-indigo-600',
		bg: 'bg-indigo-100',
	},
}

// --- КОМПОНЕНТ КАРТОЧКИ УВЕДОМЛЕНИЯ ---
const NotificationCard: React.FC<{ notification: Notification }> = ({
	notification,
}) => {
	const { icon: Icon, color, bg } = iconMap[notification.type]

	return (
		<div
			className={cn(
				'flex items-start gap-4 p-4 border-b border-border hover:bg-accent transition-colors cursor-pointer relative group',
				!notification.read ? 'bg-accent/50' : 'bg-background',
			)}
		>
			<div
				className={cn(
					'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
					bg,
				)}
			>
				<Icon size={20} className={color} />
			</div>

			<div className='flex-1 space-y-1'>
				<div className='flex items-center justify-between'>
					<p
						className={cn(
							'text-sm font-medium',
							!notification.read && 'font-bold',
						)}
					>
						{notification.title}
					</p>
					<span className='text-[10px] text-muted-foreground whitespace-nowrap ml-2'>
						{notification.time}
					</span>
				</div>
				<p className='text-xs text-muted-foreground leading-snug line-clamp-2'>
					{notification.description}
				</p>
			</div>

			{!notification.read && (
				<div className='absolute top-5 right-2 w-2 h-2 rounded-full bg-red-500' />
			)}
		</div>
	)
}

function Notifications() {
	const [notifications, setNotifications] = useState<Notification[]>(
		mockNotificationsData,
	)

	const unreadCount = notifications.filter(n => !n.read).length

	const handleClearAll = () => {
		setNotifications([])
	}

	const handleMarkAllRead = () => {
		setNotifications(prev => prev.map(n => ({ ...n, read: true })))
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<ActionBtn
					icon={Bell}
					hasBadge={unreadCount > 0}
					badgeCount={unreadCount}
				/>
			</SheetTrigger>
			<SheetContent
				side='right'
				className='w-[400px] p-0 flex flex-col bg-background sm:max-w-md'
			>
				<SheetHeader className='px-6 py-4 border-b border-border flex flex-row items-center justify-between space-y-0'>
					<div className='flex items-center gap-3'>
						<SheetClose asChild>
							<Button
								variant='ghost'
								size='icon'
								className='-ml-2 text-muted-foreground hover:text-primary'
							>
								<ChevronLeft className='h-5 w-5' />
							</Button>
						</SheetClose>
						<SheetTitle className='text-lg font-bold'>Уведомления</SheetTitle>
					</div>
					{notifications.length > 0 && (
						<Button
							variant='link'
							onClick={handleClearAll}
							className='text-muted-foreground font-semibold hover:text-red-600 hover:no-underline px-0 cursor-pointer transition-colors'
						>
							Очистить все
						</Button>
					)}
				</SheetHeader>

				<div className='flex-1 overflow-y-auto'>
					{notifications.length > 0 ? (
						<div className='flex flex-col'>
							{notifications.map(notification => (
								<NotificationCard
									key={notification.id}
									notification={notification}
								/>
							))}
						</div>
					) : (
						<div className='h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground'>
							<div className='h-24 w-24 bg-accent rounded-full flex items-center justify-center mb-4'>
								<Bell className='h-10 w-10 text-muted-foreground/50 fill-muted/20' />
							</div>
							<p className='font-medium'>Нет уведомлений</p>
							<p className='text-xs mt-1 max-w-[200px]'>
								Когда появятся новые уведомления, вы увидите их здесь.
							</p>
						</div>
					)}
				</div>

				{notifications.length > 0 && (
					<div className='p-4 border-t border-border bg-accent/20'>
						<Button
							onClick={handleMarkAllRead}
							className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
						>
							Пометить все как прочитанные
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}

export default Notifications
