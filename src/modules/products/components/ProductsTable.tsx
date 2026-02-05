import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import ProductsEdit from './ProductsEdit'
import ProductsPagination from './ProductsPagination'

// --- ТИПЫ ---
export interface Product {
	id: string
	name: string
	category: string
	price: number
	is_active: boolean
}

// --- ДАННЫЕ (Заглушка) ---
const initialProducts: Product[] = [
	{
		id: 'PROD-001',
		name: 'Беспроводные наушники Sony WH-1000XM5',
		category: 'Электроника',
		price: 35990,
		is_active: true,
	},
	{
		id: 'PROD-002',
		name: 'Кофемашина Philips Series 2200',
		category: 'Бытовая техника',
		price: 42000,
		is_active: true,
	},
	{
		id: 'PROD-003',
		name: 'Офисное кресло Markus',
		category: 'Мебель',
		price: 15999,
		is_active: false,
	},
	{
		id: 'PROD-004',
		name: 'Механическая клавиатура Keychron K2',
		category: 'Компьютеры',
		price: 8500,
		is_active: true,
	},
]

function ProductsTable() {
	const [products, setProducts] = useState<Product[]>(initialProducts)

	// Состояние редактирования
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<Product | null>(null)

	// Состояние удаления
	const [deleteId, setDeleteId] = useState<string | null>(null)

	// Форматирование цены
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumFractionDigits: 0,
		}).format(price)
	}

	const handleEditClick = (product: Product) => {
		setEditingProduct(product)
		setIsEditOpen(true)
	}

	const handleSaveProduct = (updatedProduct: Product) => {
		setProducts(prev =>
			prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)),
		)
	}

	const handleDeleteClick = (id: string) => {
		setDeleteId(id)
	}

	const confirmDelete = () => {
		if (deleteId) {
			setProducts(prev => prev.filter(p => p.id !== deleteId))

			toast('Товар удален', {
				description: 'Запись была успешно удалена из каталога.',
				action: {
					label: 'Отмена',
					onClick: () => console.log('Undo logic here'),
				},
			})

			setDeleteId(null)
		}
	}

	const content = (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='text-slate-400 h-12'>
						<TableHead className='text-slate-600'>Товар</TableHead>
						<TableHead className='text-slate-600'>Категория</TableHead>
						<TableHead className='text-slate-600'>Цена</TableHead>
						<TableHead className='text-slate-600'>Статус</TableHead>
						<TableHead className='text-slate-600 text-right'>
							Действия
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={5}
								className='h-24 text-center text-slate-500'
							>
								Товары не найдены
							</TableCell>
						</TableRow>
					) : (
						products.map(product => (
							<TableRow
								key={product.id}
								className='transition-colors hover:bg-muted/50 h-16'
							>
								{/* Название */}
								<TableCell>
									<div className='flex flex-col'>
										<span className='font-medium text-slate-900'>
											{product.name}
										</span>
										<span className='text-xs text-slate-500 sm:hidden'>
											{product.category}
										</span>
									</div>
								</TableCell>

								{/* Категория */}
								<TableCell>
									<span className='inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200'>
										{product.category}
									</span>
								</TableCell>

								{/* Цена */}
								<TableCell>
									<span className='font-medium text-slate-700'>
										{formatPrice(product.price)}
									</span>
								</TableCell>

								{/* Статус */}
								<TableCell>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
											product.is_active
												? 'bg-green-100 text-green-700'
												: 'bg-slate-100 text-slate-600'
										}`}
									>
										{product.is_active ? 'Активен' : 'Архив'}
									</span>
								</TableCell>

								{/* Действия */}
								<TableCell className='text-right'>
									<div className='flex items-center justify-end gap-2'>
										<button
											onClick={() => handleEditClick(product)}
											className='p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-md transition-colors'
											title='Редактировать'
										>
											<Pencil className='h-4 w-4' />
										</button>
										<button
											onClick={() => handleDeleteClick(product.id)}
											className='p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md transition-colors'
											title='Удалить'
										>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{products.length > 0 && <ProductsPagination />}

			{/* ВАЖНО: В ProductsEdit нужно будет поменять пропс user на product */}
			<ProductsEdit
				product={editingProduct} // Было user={editingUser}
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
				onSave={handleSaveProduct}
			/>

			<AlertDialog
				open={!!deleteId}
				onOpenChange={open => !open && setDeleteId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Удалить товар?</AlertDialogTitle>
						<AlertDialogDescription>
							Это действие нельзя отменить. Товар будет удален из каталога.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Отмена</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							className='bg-red-600 hover:bg-red-700'
						>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)

	return content
}

export default ProductsTable
