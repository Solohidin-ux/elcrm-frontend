import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import kgFlagIcon from '@/shared/icons/kyrgyzstan-flag.png'
import ruFlagIcon from '@/shared/icons/russia-flag.png'
import usFlagIcon from '@/shared/icons/united-states-flag.png'
import {
	AlertTriangle,
	Bell,
	Check,
	CheckCircle,
	ChevronLeft,
	Globe,
	Info,
	LogOut,
	MessageSquare,
	Search,
	Settings,
	User,
	XCircle,
} from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

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

			{/* Контент */}
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

			{/* Индикатор непрочитанного */}
			{!notification.read && (
				<div className='absolute top-5 right-2 w-2 h-2 rounded-full bg-red-500' />
			)}
		</div>
	)
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

interface ActionBtnProps extends React.HTMLAttributes<HTMLDivElement> {
	icon: React.ElementType
	hasBadge?: boolean
	badgeCount?: number
}

const ActionBtn = React.forwardRef<HTMLDivElement, ActionBtnProps>(
	({ icon: Icon, hasBadge, badgeCount, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={`relative inline-flex cursor-pointer group ${className}`}
				{...props}
			>
				<Button
					variant='ghost'
					size='icon'
					className='h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:text-primary transition-colors pointer-events-none'
				>
					<Icon size={20} strokeWidth={2} />
				</Button>
				{hasBadge && badgeCount !== undefined && badgeCount > 0 && (
					<Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground border-2 border-background pointer-events-none'>
						{badgeCount > 99 ? '99+' : badgeCount}
					</Badge>
				)}
			</div>
		)
	},
)
ActionBtn.displayName = 'ActionBtn'

const languages = [
	{
		code: 'ru',
		name: 'Русский',
		flag: (
			<img
				src={ruFlagIcon}
				alt='Russia'
				className='w-5 h-auto rounded-sm object-cover'
			/>
		),
	},
	{
		code: 'en',
		name: 'English',
		flag: (
			<img
				src={usFlagIcon}
				alt='USA'
				className='w-5 h-auto rounded-sm object-cover'
			/>
		),
	},
	{
		code: 'kg',
		name: 'Кыргызча',
		flag: (
			<img
				src={kgFlagIcon}
				alt='Kyrgyzstan'
				className='w-5 h-auto rounded-sm object-cover'
			/>
		),
	},
]

function TopBar() {
	const [currentLang, setCurrentLang] = useState(languages[0])
	const [notifications, setNotifications] = useState<Notification[]>(
		mockNotificationsData,
	)
	const { t, i18n } = useTranslation()

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode)
		setCurrentLang(
			languages.find(lang => lang.code === langCode) || languages[0],
		)
	}

	const unreadCount = notifications.filter(n => !n.read).length

	// Функция очистки
	const handleClearAll = () => {
		setNotifications([])
	}

	return (
		<header className='w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 py-2 shadow-sm'>
			{/* ЛЕВАЯ ЧАСТЬ: Логотип */}
			<div className='flex items-center gap-1'>
				<h1 className='text-2xl font-extrabold uppercase'>CRM</h1>
				<span className='font-extrabold uppercase text-2xl text-orange-600'>
					SYSTEM
				</span>
			</div>

			{/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: Поиск */}
			<div className='flex-1 max-w-xl mx-8'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
					<Input
						type='text'
						placeholder='Поиск...'
						className='pl-10 h-11 bg-background border-border text-muted-foreground placeholder:text-muted-foreground/50 rounded-lg focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-primary'
					/>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<div className='flex items-center gap-3 mr-4'>
					{/* Dropdown Языков */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ActionBtn icon={Globe} aria-label='Select Language' />
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-48'>
							{languages.map(lang => (
								<DropdownMenuItem
									key={lang.code}
									onClick={() => handleLanguageChange(lang.code)}
									className='flex items-center justify-between cursor-pointer py-2'
								>
									<span className='flex items-center gap-3'>
										{lang.flag}
										<span className='font-medium'>{lang.name}</span>
									</span>
									{currentLang.code === lang.code && (
										<Check size={16} className='text-primary' />
									)}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Sheet (Панель) Уведомлений */}
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
									<SheetTitle className='text-lg font-bold'>
										Уведомления
									</SheetTitle>
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

							{/* СПИСОК УВЕДОМЛЕНИЙ */}
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
									// EMPTY STATE
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

							{/* Футер панели (опционально) */}
							{notifications.length > 0 && (
								<div className='p-4 border-t border-border bg-accent/20'>
									<Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'>
										Пометить все как прочитанные
									</Button>
								</div>
							)}
						</SheetContent>
					</Sheet>
				</div>

				<div className='pl-4 border-l border-border'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='flex items-center gap-3 hover:opacity-80 transition-opacity outline-none text-left'>
								<Avatar className='h-11 w-11 bg-primary'>
									<AvatarFallback className='bg-primary text-primary-foreground font-medium text-lg'>
										A
									</AvatarFallback>
								</Avatar>
								<div className='flex flex-col leading-tight'>
									<span className='text-sm font-semibold'>Admin</span>
									<span className='text-xs text-muted-foreground'>
										admin@gmail.com
									</span>
								</div>
							</button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end' className='w-56 mt-2'>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>
										Admin Profile
									</p>
									<p className='text-xs leading-none text-muted-foreground'>
										admin@gmail.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='cursor-pointer'>
								<User className='mr-2 h-4 w-4' />
								<span>Профиль</span>
							</DropdownMenuItem>
							<NavLink to='/settings'>
								<DropdownMenuItem className='cursor-pointer'>
									<Settings className='mr-2 h-4 w-4' />
									<span>Настройки</span>
								</DropdownMenuItem>
							</NavLink>
							<DropdownMenuSeparator />
							<DropdownMenuItem className='text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50'>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Выйти</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}

export default TopBar
