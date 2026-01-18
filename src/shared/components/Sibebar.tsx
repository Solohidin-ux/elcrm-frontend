import {
	ChartPie,
	DollarSign,
	House,
	LayoutDashboard,
	Package,
	TrendingUp,
	UserCog,
	Users,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import { UrlNames } from '../enums/UrlNames'
import type { NavItem, UserRole } from '../types/sidebar'
import { CustomTooltip } from './CustomTooltip'

function Sidebar() {
	const { t } = useTranslation()
	const location = useLocation()

	const userRole: UserRole = 'guest'

	const getNavItems = (role: UserRole): NavItem[] => {
		switch (role) {
			case 'owner':
				return [
					{
						href: UrlNames.OVERVIEW,
						label: t('sidebar.overview'),
						icon: LayoutDashboard,
					},
					{
						href: UrlNames.MANAGERS,
						label: t('sidebar.managers'),
						icon: UserCog,
					},
					{
						href: UrlNames.FINANCE,
						label: t('sidebar.finance'),
						icon: DollarSign,
					},
				]

			case 'manager':
				return [
					{
						href: UrlNames.DASHBOARD,
						label: t('sidebar.overview'),
						icon: LayoutDashboard,
					},
					{
						href: UrlNames.SALES,
						label: t('sidebar.sales'),
						icon: TrendingUp,
					},
					{
						href: UrlNames.CLIENTS,
						label: t('sidebar.clients'),
						icon: Users,
					},
					{
						href: UrlNames.PRODUCTS,
						label: t('sidebar.products'),
						icon: Package,
					},
					{
						href: UrlNames.FINANCE,
						label: t('sidebar.finance'),
						icon: DollarSign,
					},
				]

			default:
				return [
					{
						href: UrlNames.DASHBOARD,
						label: t('sidebar.dashboard'),
						icon: House,
					},
					{ href: UrlNames.CLIENTS, label: t('sidebar.clients'), icon: Users },
					{
						href: UrlNames.PRODUCTS,
						label: t('sidebar.products'),
						icon: Package,
					},
					{ href: UrlNames.FUNNEL, label: t('sidebar.funnel'), icon: ChartPie },
					{
						href: UrlNames.FINANCE,
						label: t('sidebar.finance'),
						icon: DollarSign,
					},
				]
		}
	}

	const navItems = getNavItems(userRole)

	return (
		<aside className='h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-50 sticky top-0'>
			<div className='mb-7 flex flex-col items-center justify-center text-center'>
				<h1 className='text-md font-extrabold tracking-tighter uppercase text-slate-900 leading-none'>
					CRM
					<span className='block text-[14px] text-orange-600'>SYSTEM</span>
				</h1>
			</div>

			<nav className='flex flex-col space-y-2 w-full px-2'>
				{navItems.map(item => {
					// Проверяем, активен ли текущий путь
					const isActive = location.pathname === item.href

					return (
						<CustomTooltip key={item.href} content={item.label}>
							<NavLink
								to={item.href}
								className={`w-full p-3 rounded-lg flex justify-center items-center transition-colors ${
									isActive
										? 'bg-slate-800 text-white hover:bg-slate-900'
										: 'hover:bg-gray-100 text-slate-900'
								}`}
							>
								<item.icon
									className={`h-5 w-5 ${
										isActive ? 'text-white' : 'text-slate-900'
									} transition-all`}
								/>
							</NavLink>
						</CustomTooltip>
					)
				})}
			</nav>
		</aside>
	)
}

export default Sidebar
