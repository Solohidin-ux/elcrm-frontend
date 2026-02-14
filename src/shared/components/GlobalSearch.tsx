import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
	ArrowRight,
	History,
	Package,
	Search,
	ShoppingCart,
	User,
	Users,
	X,
} from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// --- Типы данных ---
type Category =
	| 'clients'
	| 'orders'
	| 'products'
	| 'payments'
	| 'reports'
	| 'suppliers'
	| 'employees'

interface SearchItem {
	id: string
	category: Category
	title: string
	subtitle?: string
	extra?: string
	statusColor?: string
	icon: React.ElementType
}

// --- MOCK DATA ---
const MOCK_DATA: SearchItem[] = [
	{
		id: 'c1',
		category: 'clients',
		title: 'Иванов Алексей',
		subtitle: '+996 700 123 456',
		extra: 'VIP',
		icon: User,
	},
	{
		id: 'c2',
		category: 'clients',
		title: 'ОсОО ТехноПлюс',
		subtitle: 'B2B клиент',
		extra: 'Активен',
		icon: User,
	},
	{
		id: 'c3',
		category: 'clients',
		title: 'Алия Садыкова',
		subtitle: 'Постоянный',
		icon: User,
	},
	// Заказы
	{
		id: 'o1',
		category: 'orders',
		title: 'Заказ #10231',
		subtitle: '12 500 сом',
		extra: 'В обработке',
		statusColor: 'bg-yellow-100 text-yellow-700',
		icon: Package,
	},
	{
		id: 'o2',
		category: 'orders',
		title: 'Заказ #10228',
		subtitle: '4 000 сом',
		extra: 'Завершён',
		statusColor: 'bg-green-100 text-green-700',
		icon: Package,
	},
	// Товары
	{
		id: 'p1',
		category: 'products',
		title: 'iPhone 14 Pro',
		subtitle: 'SKU: 14523',
		extra: '3 шт',
		icon: ShoppingCart,
	},
	{
		id: 'p2',
		category: 'products',
		title: 'Samsung A54',
		subtitle: 'SKU: 99821',
		extra: '12 шт',
		icon: ShoppingCart,
	},
	// Сотрудники
	{
		id: 'e1',
		category: 'employees',
		title: 'Менеджер Самат',
		subtitle: 'Отдел продаж',
		icon: Users,
	},
]

const CATEGORY_LABELS: Record<Category, string> = {
	clients: 'Клиенты',
	orders: 'Заказы',
	products: 'Товары',
	payments: 'Платежи',
	reports: 'Отчёты',
	suppliers: 'Поставщики',
	employees: 'Сотрудники',
}

// --- Вспомогательный компонент для подсветки ---
const HighlightedText = ({
	text,
	highlight,
}: {
	text: string
	highlight: string
}) => {
	if (!highlight.trim()) return <span>{text}</span>

	const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
	return (
		<span>
			{parts.map((part, i) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<span
						key={i}
						className='bg-yellow-200 text-black font-semibold rounded-[2px] px-0.5'
					>
						{part}
					</span>
				) : (
					part
				),
			)}
		</span>
	)
}

export function GlobalSearch() {
	const [query, setQuery] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(-1)
	const [recentSearches, setRecentSearches] = useState<string[]>([
		'Заказ #10231',
		'iPhone 14',
	])

	const inputRef = useRef<HTMLInputElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

	// Логика фильтрации
	const filteredData = useMemo(() => {
		if (query.length < 2) return {}

		const lowerQuery = query.toLowerCase()
		const groups: Record<string, SearchItem[]> = {}

		MOCK_DATA.forEach(item => {
			if (
				item.title.toLowerCase().includes(lowerQuery) ||
				item.subtitle?.toLowerCase().includes(lowerQuery) ||
				item.extra?.toLowerCase().includes(lowerQuery)
			) {
				if (!groups[item.category]) {
					groups[item.category] = []
				}
				groups[item.category].push(item)
			}
		})

		return groups
	}, [query])

	// Плоский список для навигации клавиатурой
	const flatList = useMemo(() => {
		return Object.values(filteredData).flat()
	}, [filteredData])

	// Обработчик нажатия клавиш (Global Ctrl+K и Escape)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault()
				inputRef.current?.focus()
				setIsOpen(true)
			}
			if (e.key === 'Escape') {
				setIsOpen(false)
				inputRef.current?.blur()
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	// Закрытие при клике вне компонента
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Переход на страницу "Показать все результаты"
	const handleShowAll = (searchQuery: string) => {
		setIsOpen(false)
		setQuery('') // Очищаем поле (опционально)
		// ⚠️ ВАЖНО: Используем параметр 'q', так как страница результатов ожидает searchParams.get('q')
		navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
	}

	// Выбор конкретного элемента из выпадающего списка
	const handleSelect = (item: SearchItem) => {
		// Добавляем в историю
		if (!recentSearches.includes(item.title)) {
			setRecentSearches(prev => [item.title, ...prev].slice(0, 5))
		}
		setQuery('')
		setIsOpen(false)
		// Пример навигации на детальную страницу
		navigate(`/details/${item.category}/${item.id}`)
	}

	// Навигация внутри Input (Стрелки + Enter)
	const handleInputKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setSelectedIndex(prev => (prev < flatList.length - 1 ? prev + 1 : prev))
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
		} else if (e.key === 'Enter') {
			e.preventDefault()
			if (selectedIndex >= 0 && flatList[selectedIndex]) {
				// Если выбран элемент из списка -> переходим к нему
				handleSelect(flatList[selectedIndex])
			} else if (query) {
				// Если просто введен текст -> идем на страницу поиска
				handleShowAll(query)
			}
		}
	}

	const handleRecentClick = (text: string) => {
		setQuery(text)
		inputRef.current?.focus()
	}

	const hasResults = Object.keys(filteredData).length > 0

	return (
		<div ref={containerRef} className='relative w-full max-w-2xl mx-auto'>
			<div className='relative group'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
				<Input
					ref={inputRef}
					value={query}
					onChange={e => {
						setQuery(e.target.value)
						setIsOpen(true)
						setSelectedIndex(-1)
					}}
					onKeyDown={handleInputKeyDown}
					onFocus={() => setIsOpen(true)}
					placeholder='Поиск по CRM (клиенты, заказы, товары)...'
					className='pl-10 pr-12 h-11 bg-muted/40 border-muted-foreground/20 focus:bg-background transition-all shadow-sm'
				/>
				<div className='absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1'>
					{query ? (
						<button
							onClick={() => {
								setQuery('')
								setSelectedIndex(-1)
								inputRef.current?.focus()
							}}
							className='text-muted-foreground hover:text-foreground'
						>
							<X className='h-4 w-4' />
						</button>
					) : (
						<kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
							<span className='text-xs'>⌘</span>K
						</kbd>
					)}
				</div>
			</div>

			{isOpen && (
				<div className='absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
					<ScrollArea className='max-h-[450px] overflow-y-auto'>
						<div className='p-2'>
							{/* 1. STATE: Нет результатов */}
							{query.length > 1 && !hasResults && (
								<div className='p-8 text-center text-muted-foreground'>
									<Search className='h-10 w-10 mx-auto mb-3 opacity-20' />
									<p>Ничего не найдено по запросу "{query}"</p>
								</div>
							)}

							{/* 2. STATE: Недавние поиски */}
							{query.length < 2 && recentSearches.length > 0 && (
								<div className='mb-2'>
									<h3 className='px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
										Недавние
									</h3>
									{recentSearches.map((text, idx) => (
										<div
											key={idx}
											onClick={() => handleRecentClick(text)}
											className='flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent cursor-pointer text-sm group'
										>
											<History className='h-4 w-4 text-muted-foreground group-hover:text-primary' />
											<span>{text}</span>
										</div>
									))}
								</div>
							)}

							{/* 3. STATE: Результаты поиска */}
							{hasResults &&
								Object.entries(filteredData).map(([catKey, items]) => (
									<div key={catKey} className='mb-2'>
										<h3 className='px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 rounded-md mb-1 flex items-center justify-between'>
											{CATEGORY_LABELS[catKey as Category] || catKey}
											<Badge
												variant='secondary'
												className='h-5 px-1.5 text-[10px]'
											>
												{items.length}
											</Badge>
										</h3>
										<div className='space-y-1'>
											{items.map(item => {
												const isSelected =
													flatList.indexOf(item) === selectedIndex

												return (
													<div
														key={item.id}
														onClick={() => handleSelect(item)}
														onMouseEnter={() =>
															setSelectedIndex(flatList.indexOf(item))
														}
														className={cn(
															'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm',
															isSelected
																? 'bg-accent text-accent-foreground'
																: 'hover:bg-accent/50',
														)}
													>
														<div className='flex items-center gap-3 overflow-hidden'>
															<div
																className={cn(
																	'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-background border border-border',
																	isSelected &&
																		'border-primary/30 bg-background',
																)}
															>
																<item.icon className='h-4 w-4 text-muted-foreground' />
															</div>
															<div className='flex flex-col truncate'>
																<span className='font-medium truncate'>
																	<HighlightedText
																		text={item.title}
																		highlight={query}
																	/>
																</span>
																{item.subtitle && (
																	<span className='text-xs text-muted-foreground truncate'>
																		<HighlightedText
																			text={item.subtitle}
																			highlight={query}
																		/>
																	</span>
																)}
															</div>
														</div>

														{item.extra && (
															<div className='flex-shrink-0 ml-4 text-right'>
																{item.statusColor ? (
																	<Badge
																		variant='outline'
																		className={cn(
																			'font-normal border-0',
																			item.statusColor,
																		)}
																	>
																		{item.extra}
																	</Badge>
																) : (
																	<span className='text-xs font-medium text-muted-foreground'>
																		<HighlightedText
																			text={item.extra}
																			highlight={query}
																		/>
																	</span>
																)}
															</div>
														)}
													</div>
												)
											})}
										</div>
									</div>
								))}
						</div>
					</ScrollArea>

					{/* FOOTER: Показать все */}
					{query.length > 1 && (
						<div
							className='p-2 bg-accent/20 border-t border-border cursor-pointer hover:bg-accent/40 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-primary'
							onClick={() => handleShowAll(query)}
						>
							<span>Показать все результаты для "{query}"</span>
							<ArrowRight className='h-4 w-4' />
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default GlobalSearch
