import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sibebar'
import TopBar from './TopBar'

interface LayoutProps {
	children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='flex h-screen w-full bg-white overflow-hidden font-sans text-slate-900'>
			{/* Левая часть - Сайдбар */}
			<div className='flex-none'>
				<Sidebar />
			</div>

			{/* Правая часть - Основной контент */}
			<main className='flex-1 flex flex-col min-w-0 bg-slate-50/50'>
				{/* 1. Вставляем TopBar здесь, чтобы он был сверху над контентом */}
				<TopBar />

				{/* 2. Область контента, которая будет скроллиться */}
				<div className='flex-1 overflow-y-auto p-6'>
					{children || <Outlet />}
				</div>
			</main>
		</div>
	)
}

export default Layout
