import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sibebar'
import TopBar from './TopBar'

interface LayoutProps {
	children?: React.ReactNode
	className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
	return (
		<div className='flex h-screen w-full bg-white overflow-hidden font-sans text-slate-900'>
			<div className='flex-none'>
				<Sidebar />
			</div>

			<main className='flex-1 flex flex-col min-w-0 bg-slate-50/50'>
				<TopBar />

				<div className='flex-1 overflow-y-auto'>
					<div className={`bg-white p-2 ${className || ''}`}>
						{children || <Outlet />}
					</div>
				</div>
			</main>
		</div>
	)
}

export default Layout
