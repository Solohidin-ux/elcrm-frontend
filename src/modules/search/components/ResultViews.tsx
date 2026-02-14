import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
	Calendar,
	CreditCard,
	Hash,
	MoreHorizontal,
	Package,
	ShoppingCart,
	User,
} from 'lucide-react'
import React from 'react'

// --- ТИПЫ ДАННЫХ ---
export type EntityType = 'client' | 'order' | 'product' | 'payment'

export interface SearchResultItem {
	id: string
	type: EntityType
	title: string
	subtitle: string
	status: string
	statusColor: 'default' | 'success' | 'warning' | 'destructive' | 'outline'
	date: string
	details: { label: string; value: string }[]
}

export const HighlightedText = ({
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
const ENTITY_CONFIG: Record<
	EntityType,
	{ icon: React.ElementType; color: string; bg: string; label: string }
> = {
	client: {
		icon: User,
		color: 'text-blue-600',
		bg: 'bg-blue-100',
		label: 'Клиент',
	},
	order: {
		icon: Package,
		color: 'text-purple-600',
		bg: 'bg-purple-100',
		label: 'Заказ',
	},
	product: {
		icon: ShoppingCart,
		color: 'text-orange-600',
		bg: 'bg-orange-100',
		label: 'Товар',
	},
	payment: {
		icon: CreditCard,
		color: 'text-green-600',
		bg: 'bg-green-100',
		label: 'Платеж',
	},
}

// --- КОМПОНЕНТ: КАРТОЧКА (GRID VIEW) ---
export const ResultCard = ({
	item,
	query,
}: {
	item: SearchResultItem
	query: string
}) => {
	const config = ENTITY_CONFIG[item.type]
	const Icon = config.icon

	return (
		<Card className='hover:shadow-md transition-shadow cursor-pointer group border-border'>
			<CardContent className='p-5'>
				<div className='flex items-start justify-between mb-4'>
					<div className='flex items-center gap-3'>
						<div
							className={cn(
								'h-10 w-10 rounded-lg flex items-center justify-center',
								config.bg,
							)}
						>
							<Icon className={cn('h-5 w-5', config.color)} />
						</div>
						<div>
							<span className='text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
								{config.label}
							</span>
							<h3 className='font-bold text-lg leading-tight group-hover:text-primary transition-colors'>
								<HighlightedText text={item.title} highlight={query} />
							</h3>
						</div>
					</div>
					<Badge variant={item.statusColor as any}>{item.status}</Badge>
				</div>

				<div className='space-y-2 text-sm text-muted-foreground mb-4'>
					<div className='flex items-center gap-2'>
						<Hash className='h-3.5 w-3.5 opacity-70' />
						<span>
							<HighlightedText text={item.subtitle} highlight={query} />
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<Calendar className='h-3.5 w-3.5 opacity-70' />
						<span>{item.date}</span>
					</div>
				</div>

				<div className='pt-4 border-t border-border grid grid-cols-2 gap-2'>
					{item.details.map((detail, idx) => (
						<div key={idx} className='flex flex-col'>
							<span className='text-[10px] uppercase text-muted-foreground font-medium'>
								{detail.label}
							</span>
							<span className='font-semibold text-sm text-foreground'>
								{detail.value}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

// --- КОМПОНЕНТ: СТРОКА ТАБЛИЦЫ (LIST VIEW) ---
export const ResultRow = ({
	item,
	query,
}: {
	item: SearchResultItem
	query: string
}) => {
	const config = ENTITY_CONFIG[item.type]
	const Icon = config.icon

	return (
		<TableRow className='cursor-pointer hover:bg-muted/50'>
			<TableCell className='w-[50px]'>
				<div
					className={cn(
						'h-9 w-9 rounded-md flex items-center justify-center',
						config.bg,
					)}
				>
					<Icon className={cn('h-4 w-4', config.color)} />
				</div>
			</TableCell>
			<TableCell>
				<div className='flex flex-col'>
					<span className='font-bold text-sm'>
						<HighlightedText text={item.title} highlight={query} />
					</span>
					<span className='text-xs text-muted-foreground'>{config.label}</span>
				</div>
			</TableCell>
			<TableCell>
				<span className='text-sm font-medium text-muted-foreground'>
					<HighlightedText text={item.subtitle} highlight={query} />
				</span>
			</TableCell>
			<TableCell>
				<div className='flex gap-4'>
					{item.details.map((detail, idx) => (
						<div key={idx} className='flex flex-col'>
							<span className='text-[10px] text-muted-foreground'>
								{detail.label}
							</span>
							<span className='text-sm font-medium'>{detail.value}</span>
						</div>
					))}
				</div>
			</TableCell>
			<TableCell>
				<Badge variant={item.statusColor as any}>{item.status}</Badge>
			</TableCell>
			<TableCell className='text-right text-muted-foreground text-sm'>
				{item.date}
			</TableCell>
			<TableCell className='text-right'>
				<Button variant='ghost' size='icon' className='h-8 w-8'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</TableCell>
		</TableRow>
	)
}
