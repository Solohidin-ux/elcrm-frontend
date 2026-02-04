import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import Layout from '@/shared/components/Layout'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
	ArrowUp,
	BarChart3,
	Calendar as CalendarIcon,
	CreditCard,
	MoreHorizontal,
	TrendingUp,
	User,
	Wallet,
} from 'lucide-react'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

// --- Mock Data ---
const MOCK_DATA = {
	metrics: {
		salesDay: 124560,
		salesMonth: 3420900,
		avgCheck: 15400,
	},
	bestSeller: {
		name: 'Иван Петров',
		amount: 820400,
		role: 'Senior Manager',
		deals: 42,
	},
	// Данные для графика (убрал лишние css классы, оставил чистые данные)
	chartData: [
		{ label: 'Пн', value: 45000 },
		{ label: 'Вт', value: 72000 },
		{ label: 'Ср', value: 35000 },
		{ label: 'Чт', value: 60000 },
		{ label: 'Пт', value: 90000 },
		{ label: 'Сб', value: 55000 },
		{ label: 'Вс', value: 80000 },
	],
	topProducts: [
		{
			name: 'AirPods Pro 2',
			category: 'Наушники',
			sold: 142,
			revenue: 2840000,
			conversion: 18.4,
			trend: 'up',
		},
		{
			name: 'iPhone 15 Pro',
			category: 'Смартфоны',
			sold: 89,
			revenue: 10680000,
			conversion: 14.2,
			trend: 'up',
		},
		{
			name: 'MacBook Air M2',
			category: 'Ноутбуки',
			sold: 34,
			revenue: 4080000,
			conversion: 11.9,
			trend: 'neutral',
		},
		{
			name: 'Samsung S24',
			category: 'Смартфоны',
			sold: 65,
			revenue: 5200000,
			conversion: 10.5,
			trend: 'up',
		},
		{
			name: 'Xiaomi 14',
			category: 'Смартфоны',
			sold: 41,
			revenue: 2050000,
			conversion: 8.1,
			trend: 'down',
		},
		{
			name: 'iPad Air 5',
			category: 'Планшеты',
			sold: 28,
			revenue: 1680000,
			conversion: 6.4,
			trend: 'neutral',
		},
	],
}

const chartConfig = {
	sales: {
		label: 'Продажи',
		color: 'hsl(var(--primary))',
	},
} satisfies ChartConfig

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'KGS',
		maximumFractionDigits: 0,
	}).format(value)
}

function FinancesPage() {
	const [periodType, setPeriodType] = useState<'day' | 'week' | 'month'>(
		'month',
	)
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2024, 0, 1),
		to: new Date(2024, 0, 31),
	})

	return (
		<Layout>
			<div className='flex-1 space-y-4 p-4'>
				{/* --- Topbar & Controls --- */}
				<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<h2 className='text-xl font-bold tracking-tight'>Финансы</h2>

					<div className='flex flex-wrap items-center gap-2'>
						<div className='flex items-center rounded-md border bg-muted p-0.5 gap-1'>
							{['day', 'week', 'month'].map(t => (
								<Button
									key={t}
									variant={periodType === t ? 'default' : 'ghost'}
									size='sm'
									onClick={() => setPeriodType(t as any)}
									className='h-7 px-3 text-xs capitalize shadow-none'
								>
									{t === 'day' ? 'День' : t === 'week' ? 'Неделя' : 'Месяц'}
								</Button>
							))}
						</div>

						<div className='grid gap-2'>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										id='date'
										variant={'outline'}
										size='sm'
										className={cn(
											'w-[210px] justify-start text-left font-normal h-8 text-xs',
											!date && 'text-muted-foreground',
										)}
									>
										<CalendarIcon className='mr-2 h-3.5 w-3.5' />
										{date?.from ? (
											date.to ? (
												<>
													{format(date.from, 'dd.MM', { locale: ru })} -{' '}
													{format(date.to, 'dd.MM.yyyy', { locale: ru })}
												</>
											) : (
												format(date.from, 'dd.MM.yyyy', { locale: ru })
											)
										) : (
											<span>Выберите даты</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='end'>
									<Calendar
										initialFocus
										mode='range'
										defaultMonth={date?.from}
										selected={date}
										onSelect={setDate}
										numberOfMonths={2}
										locale={ru}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>

				{/* --- KPI Cards --- */}
				<div className='grid gap-3 md:grid-cols-3'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 p-4'>
							<CardTitle className='text-sm font-medium'>
								Выручка за день
							</CardTitle>
							<Wallet className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent className='p-4 pt-0'>
							<div className='text-xl font-bold'>
								{formatCurrency(MOCK_DATA.metrics.salesDay)}
							</div>
							<p className='text-[10px] text-emerald-600 flex items-center mt-1 font-medium'>
								<ArrowUp className='h-3 w-3 mr-1' /> +20.1% к вчера
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 p-4'>
							<CardTitle className='text-sm font-medium'>
								Выручка за месяц
							</CardTitle>
							<BarChart3 className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent className='p-4 pt-0'>
							<div className='text-xl font-bold'>
								{formatCurrency(MOCK_DATA.metrics.salesMonth)}
							</div>
							<p className='text-[10px] text-emerald-600 flex items-center mt-1 font-medium'>
								<ArrowUp className='h-3 w-3 mr-1' /> +12.5% к прошлому
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-1 p-4'>
							<CardTitle className='text-sm font-medium'>Средний чек</CardTitle>
							<CreditCard className='h-4 w-4 text-muted-foreground' />
						</CardHeader>
						<CardContent className='p-4 pt-0'>
							<div className='text-xl font-bold'>
								{formatCurrency(MOCK_DATA.metrics.avgCheck)}
							</div>
							<p className='text-[10px] text-muted-foreground mt-1'>
								~ 2.3 позиции в чеке
							</p>
						</CardContent>
					</Card>
				</div>

				{/* --- Chart & Best Seller --- */}
				<div className='grid gap-3 md:grid-cols-7 lg:grid-cols-7'>
					{/* === ГРАФИК SHADCN === */}
					<Card className='col-span-4 md:col-span-5'>
						<CardHeader className='p-4 pb-0'>
							<CardTitle className='text-sm'>Динамика продаж</CardTitle>
							<CardDescription className='text-xs'>
								Обзор выручки за текущую неделю
							</CardDescription>
						</CardHeader>
						<CardContent className='p-4'>
							<ChartContainer
								config={chartConfig}
								className='max-h-[300px] w-full'
							>
								<BarChart accessibilityLayer data={MOCK_DATA.chartData}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey='label'
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={value => value}
										className='text-xs'
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent hideLabel />}
									/>
									<Bar
										dataKey='value'
										fill='var(--color-sales)'
										radius={[4, 4, 0, 0]}
										barSize={40}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>

					{/* === Лучший сотрудник === */}
					<Card className='col-span-3 md:col-span-2 flex flex-col'>
						<CardHeader className='p-4 pb-2'>
							<CardTitle className='text-sm'>Лучший сотрудник</CardTitle>
							<CardDescription className='text-[10px]'>
								Лидер недели
							</CardDescription>
						</CardHeader>
						<CardContent className='p-4 flex flex-col items-center justify-center flex-1 text-center'>
							<div className='h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-3'>
								<User className='h-7 w-7 text-primary' />
							</div>
							<h3 className='font-bold text-sm leading-tight'>
								{MOCK_DATA.bestSeller.name}
							</h3>
							<p className='text-[10px] text-muted-foreground mb-3'>
								{MOCK_DATA.bestSeller.role}
							</p>
							<div className='w-full grid grid-cols-2 gap-2 border-t pt-3'>
								<div>
									<p className='text-[10px] text-muted-foreground'>Выручка</p>
									<p className='font-bold text-xs'>
										{formatCurrency(MOCK_DATA.bestSeller.amount)}
									</p>
								</div>
								<div>
									<p className='text-[10px] text-muted-foreground'>Сделки</p>
									<p className='font-bold text-xs'>
										{MOCK_DATA.bestSeller.deals}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* --- Table --- */}
				<Card>
					<CardHeader className='p-4'>
						<div className='flex items-center justify-between'>
							<div>
								<CardTitle className='text-base'>Детализация продаж</CardTitle>
								<CardDescription className='text-xs mt-1'>
									Статистика по самым продаваемым товарам
								</CardDescription>
							</div>
							<Button variant='outline' size='sm' className='h-7 text-xs'>
								Скачать отчет
							</Button>
						</div>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='relative w-full overflow-auto'>
							<table className='w-full caption-bottom text-sm text-left'>
								<thead className='[&_tr]:border-b'>
									<tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
										<th className='h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs w-[50px]'>
											#
										</th>
										<th className='h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs'>
											Товар
										</th>
										<th className='h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs'>
											Категория
										</th>
										<th className='h-10 px-4 text-right align-middle font-medium text-muted-foreground text-xs'>
											Продано
										</th>
										<th className='h-10 px-4 text-right align-middle font-medium text-muted-foreground text-xs'>
											Выручка
										</th>
										<th className='h-10 px-4 text-right align-middle font-medium text-muted-foreground text-xs'>
											Конверсия
										</th>
									</tr>
								</thead>
								<tbody className='[&_tr:last-child]:border-0'>
									{MOCK_DATA.topProducts.map((product, i) => (
										<tr
											key={i}
											className='border-b transition-colors hover:bg-muted/50'
										>
											<td className='p-4 py-3 align-middle text-xs font-medium text-muted-foreground'>
												{i + 1}
											</td>
											<td className='p-4 py-3 align-middle font-medium'>
												{product.name}
											</td>
											<td className='p-4 py-3 align-middle text-xs text-muted-foreground'>
												{product.category}
											</td>
											<td className='p-4 py-3 align-middle text-right text-xs'>
												{product.sold} шт.
											</td>
											<td className='p-4 py-3 align-middle text-right font-medium text-xs'>
												{formatCurrency(product.revenue)}
											</td>
											<td className='p-4 py-3 align-middle text-right'>
												<div className='flex items-center justify-end gap-2'>
													<span className='text-xs font-bold'>
														{product.conversion}%
													</span>
													{product.trend === 'up' && (
														<TrendingUp className='h-3 w-3 text-emerald-500' />
													)}
													{product.trend === 'down' && (
														<TrendingUp className='h-3 w-3 text-rose-500 rotate-180' />
													)}
													{product.trend === 'neutral' && (
														<MoreHorizontal className='h-3 w-3 text-muted-foreground' />
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</Layout>
	)
}

export default FinancesPage
