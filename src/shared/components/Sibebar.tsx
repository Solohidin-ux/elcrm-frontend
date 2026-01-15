import { ChartPie, DollarSign, House, Package, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { NavItem } from '../types/sidebar'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CustomTooltip } from './CustomTooltip'

function Sidebar() {
	const { t } = useTranslation()
	const [activeItem, setActiveItem] = useState<string | null>('/')

	const navItems: NavItem[] = [
		{ href: '/', label: t('sidebar.dashboard'), icon: House },
		{ href: '/clients', label: t('sidebar.clients'), icon: Users },
		{ href: '/products', label: t('sidebar.products'), icon: Package },
		{ href: '/funnel', label: t('sidebar.funnel'), icon: ChartPie },
		{ href: '/finance', label: t('sidebar.finance'), icon: DollarSign },
	]

	return (
		<aside className='h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-50'>
			<div className='mb-7 flex flex-col items-center justify-center text-center'>
				<h1 className='text-md font-extrabold tracking-tighter uppercase text-slate-900 leading-none'>
					CRM
					<span className='block text-[14px] text-orange-600'>SYSTEM</span>
				</h1>
			</div>

			<nav className='flex flex-col space-y-2'>
				{navItems.map(item => (
					<CustomTooltip key={item.href} content={item.label}>
						<NavLink
							to={item.href}
							className={`w-full h-ful p-3 rounded-lg ${
								activeItem === item.href
									? 'bg-slate-600 text-white hover:bg-slate-700'
									: 'hover:bg-gray-100'
							}`}
						>
							<item.icon
								className={`h-5 w-5 ${
									activeItem === item.href ? 'text-white' : 'text-slate-900'
								} transition-all`}
							/>
						</NavLink>
					</CustomTooltip>
				))}
			</nav>
		</aside>
	)
}

export default Sidebar
