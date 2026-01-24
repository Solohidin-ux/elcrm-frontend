import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import ProductsPagination from './ProductsPagination'

// Мок-данные товаров
const products = [
	{
		id: 'PRD-001',
		name: 'Apple iPhone 15 Pro 256GB',
		category: 'Электроника',
		price: '129 990 ₽',
		status: 'In Stock', // В наличии
		stock: 45,
	},
	{
		id: 'PRD-002',
		name: 'Мужская футболка Basic Cotton',
		category: 'Одежда',
		price: '1 500 ₽',
		status: 'Low Stock', // Заканчивается
		stock: 5,
	},
	{
		id: 'PRD-003',
		name: 'Кофемашина Philips Series 2200',
		category: 'Бытовая техника',
		price: '34 990 ₽',
		status: 'In Stock',
		stock: 18,
	},
	{
		id: 'PRD-004',
		name: 'Кроссовки Nike Air Max',
		category: 'Обувь',
		price: '12 490 ₽',
		status: 'Out of Stock', // Нет в наличии
		stock: 0,
	},
	{
		id: 'PRD-005',
		name: 'Игровой монитор Samsung Odyssey',
		category: 'Электроника',
		price: '28 000 ₽',
		status: 'In Stock',
		stock: 8,
	},
]

function ProductsTable() {
	const content = (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='text-slate-400 h-12'>
						<TableHead className='w-[100px] text-slate-600'>ID</TableHead>
						<TableHead className='text-slate-600'>Название товара</TableHead>
						<TableHead className='text-slate-600'>Категория</TableHead>
						<TableHead className='text-slate-600'>Статус</TableHead>
						<TableHead className='text-slate-600 text-right'>Цена</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow
							key={product.id}
							className='transition-colors hover:bg-muted/50 h-12'
						>
							<TableCell className='font-medium'>{product.id}</TableCell>
							<TableCell>
								<div className='flex flex-col'>
									<span className='font-medium'>{product.name}</span>
									<span className='text-xs text-slate-400'>
										Остаток: {product.stock} шт.
									</span>
								</div>
							</TableCell>
							<TableCell>{product.category}</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										product.status === 'In Stock'
											? 'bg-green-100 text-green-800'
											: product.status === 'Low Stock'
												? 'bg-yellow-100 text-yellow-800'
												: 'bg-red-100 text-red-800'
									}`}
								>
									{product.status === 'In Stock' && 'В наличии'}
									{product.status === 'Low Stock' && 'Заканчивается'}
									{product.status === 'Out of Stock' && 'Нет в наличии'}
								</span>
							</TableCell>
							<TableCell className='text-right font-medium'>
								{product.price}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<ProductsPagination />
		</div>
	)

	return content
}

export default ProductsTable
