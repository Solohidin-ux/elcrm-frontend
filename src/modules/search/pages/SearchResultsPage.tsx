import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Layout from '@/shared/components/Layout'
import { LayoutGrid, List as ListIcon, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	ResultCard,
	ResultRow,
	type SearchResultItem,
} from '../components/ResultViews'
import SearchFilters from '../components/SearchFilters'

// --- MOCK DATA ---
const MOCK_RESULTS: SearchResultItem[] = [
	{
		id: '1',
		type: 'product',
		title: 'iPhone 14 Pro Max',
		subtitle: 'SKU: 14523',
		status: 'В наличии',
		statusColor: 'success',
		date: '12.10.2023',
		details: [
			{ label: 'Цена', value: '115 000 c' },
			{ label: 'Остаток', value: '3 шт' },
		],
	},
	{
		id: '2',
		type: 'client',
		title: 'ОсОО TechMarket',
		subtitle: '+996 700 123 456',
		status: 'VIP',
		statusColor: 'warning',
		date: '01.09.2023',
		details: [
			{ label: 'Тип', value: 'Юр. лицо' },
			{ label: 'Заказов', value: '12' },
		],
	},
	{
		id: '3',
		type: 'order',
		title: 'Заказ #10231',
		subtitle: 'Иванов Алексей',
		status: 'В обработке',
		statusColor: 'outline',
		date: 'Сегодня',
		details: [
			{ label: 'Сумма', value: '12 500 c' },
			{ label: 'Товаров', value: '4' },
		],
	},
	{
		id: '4',
		type: 'payment',
		title: 'Платеж #9921',
		subtitle: 'По заказу #10231',
		status: 'Успешно',
		statusColor: 'success',
		date: 'Вчера',
		details: [
			{ label: 'Сумма', value: '12 500 c' },
			{ label: 'Метод', value: 'Visa' },
		],
	},
	{
		id: '5',
		type: 'product',
		title: 'Samsung Galaxy S23',
		subtitle: 'SKU: 99120',
		status: 'Мало',
		statusColor: 'warning',
		date: '10.10.2023',
		details: [
			{ label: 'Цена', value: '85 000 c' },
			{ label: 'Остаток', value: '2 шт' },
		],
	},
	// Можно добавить больше данных для тестов...
]

function SearchResultsPage() {
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q') || 'iphone'

	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
	const [selectedTypes, setSelectedTypes] = useState<string[]>([
		'client',
		'order',
		'product',
		'payment',
	])

	const filteredResults = useMemo(() => {
		return MOCK_RESULTS.filter(item => selectedTypes.includes(item.type))
	}, [selectedTypes])

	const counts = useMemo(() => {
		const c: Record<string, number> = {}
		MOCK_RESULTS.forEach(item => {
			c[item.type] = (c[item.type] || 0) + 1
		})
		return c
	}, [])

	const handleTypeChange = (type: string) => {
		setSelectedTypes(prev =>
			prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
		)
	}

	const content = (
		<Layout>
			{/* Top СТРАНИЦЫ */}
			<div className='bg-background border-b border-border p-4'>
				<div className='flex items-center gap-3 mb-2'>
					<h1 className='text-3xl font-bold tracking-tight'>
						Результаты поиска
					</h1>
				</div>
				<p className='text-muted-foreground'>
					По запросу{' '}
					<span className='font-bold text-foreground'>"{query}"</span> найдено{' '}
					{filteredResults.length} результатов
				</p>
			</div>

			<div className='flex-1 p-4'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Filters */}
					<aside className='lg:w-64 flex-shrink-0'>
						<div className='sticky top-6'>
							<SearchFilters
								selectedTypes={selectedTypes}
								onTypeChange={handleTypeChange}
								totalCounts={counts}
							/>
						</div>
					</aside>

					{/* Main Content */}
					<div className='flex-1'>
						{/* Controls Toolbar */}
						<div className='flex flex-col sm:flex-row items-center justify-between mb-6 gap-4'>
							<div className='flex items-center gap-2 w-full sm:w-auto'>
								<Select defaultValue='relevance'>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Сортировка' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='relevance'>По релевантности</SelectItem>
										<SelectItem value='newest'>Сначала новые</SelectItem>
										<SelectItem value='oldest'>Сначала старые</SelectItem>
										<SelectItem value='price-asc'>По цене (возр.)</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='flex items-center bg-background border border-border rounded-lg p-1'>
								<Button
									variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
									size='sm'
									onClick={() => setViewMode('grid')}
									className='h-8 w-8 p-0'
								>
									<LayoutGrid className='h-4 w-4' />
								</Button>
								<Button
									variant={viewMode === 'list' ? 'secondary' : 'ghost'}
									size='sm'
									onClick={() => setViewMode('list')}
									className='h-8 w-8 p-0'
								>
									<ListIcon className='h-4 w-4' />
								</Button>
							</div>
						</div>

						{/* Results List */}
						{filteredResults.length > 0 ? (
							viewMode === 'grid' ? (
								// GRID VIEW
								<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
									{filteredResults.map(item => (
										<ResultCard key={item.id} item={item} query={query} />
									))}
								</div>
							) : (
								// TABLE VIEW
								<div className='border border-border rounded-lg bg-background overflow-hidden'>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className='w-[50px]'></TableHead>
												<TableHead>Название</TableHead>
												<TableHead>Инфо</TableHead>
												<TableHead>Детали</TableHead>
												<TableHead>Статус</TableHead>
												<TableHead className='text-right'>Дата</TableHead>
												<TableHead className='w-[50px]'></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredResults.map(item => (
												<ResultRow key={item.id} item={item} query={query} />
											))}
										</TableBody>
									</Table>
								</div>
							)
						) : (
							// EMPTY STATE
							<div className='flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl bg-background/50'>
								<div className='bg-muted p-4 rounded-full mb-4'>
									<Search className='h-8 w-8 text-muted-foreground' />
								</div>
								<h3 className='text-lg font-semibold'>Ничего не найдено</h3>
								<p className='text-muted-foreground max-w-sm mt-2'>
									Попробуйте изменить параметры фильтрации или введите другой
									поисковый запрос.
								</p>
								<Button
									variant='outline'
									className='mt-6'
									onClick={() =>
										setSelectedTypes(['client', 'order', 'product', 'payment'])
									}
								>
									Сбросить все фильтры
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)

	return content
}

export default SearchResultsPage
