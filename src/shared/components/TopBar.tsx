import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import kgFlagIcon from '@/shared/icons/kyrgyzstan-flag.png'
import ruFlagIcon from '@/shared/icons/russia-flag.png'
import usFlagIcon from '@/shared/icons/united-states-flag.png'
import { Check, Globe, LogOut, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { ActionBtn } from './ActionBtn'
import GlobalSearch from './GlobalSearch'
import Notifications from './Notifications'

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
	const { t, i18n } = useTranslation()

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode)
		setCurrentLang(
			languages.find(lang => lang.code === langCode) || languages[0],
		)
	}

	return (
		<header className='w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 py-2 shadow-sm z-50 relative'>
			{/* ЛЕВАЯ ЧАСТЬ: Логотип */}
			<div className='flex items-center gap-1 min-w-fit'>
				<h1 className='text-2xl font-extrabold uppercase'>CRM</h1>
				<span className='font-extrabold uppercase text-2xl text-orange-600'>
					SYSTEM
				</span>
			</div>

			{/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: Глобальный Поиск */}
			<div className='flex-1 mx-8'>
				<GlobalSearch />
			</div>

			{/* ПРАВАЯ ЧАСТЬ: Кнопки и Профиль */}
			<div className='flex items-center gap-3 min-w-fit'>
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

					{/* Компонент Уведомлений */}
					<Notifications />
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
