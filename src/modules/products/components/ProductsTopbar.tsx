import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import ProductsAddProduct from './ProductsAddProduct'

function ProductsTopbar() {
	const content = (
		<div className='flex flex-col gap-4 p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900'>
					Список товаров
				</h1>

				<ProductsAddProduct />
			</div>

			<div className='flex items-center justify-between gap-3'>
				<div className='relative'>
					<Search className='absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400' />
					<Input
						placeholder='Поиск'
						className='h-9 w-[300px] rounded-md border border-slate-300 bg-slate-50 pl-11 text-slate-600 placeholder:text-slate-400 outline focus-visible:ring-1 shadow-none'
					/>
				</div>

				<Select defaultValue='newest'>
					<SelectTrigger className='h-11 w-auto min-w-[220px] rounded-md border border-slate-300 bg-slate-100 px-4 text-slate-600 '>
						<div className='flex items-center gap-1'>
							<span className='text-slate-500'>Сортировать :</span>
							<span className='font-bold text-slate-900'>
								<SelectValue />
							</span>
						</div>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='newest'>Сначала новые</SelectItem>
						<SelectItem value='oldest'>Сначала старые</SelectItem>
						<SelectItem value='price-desc'>Сначала дорогие</SelectItem>
						<SelectItem value='price-asc'>Сначала дешевые</SelectItem>
						<SelectItem value='name'>По названию (А-Я)</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	)

	return content
}

export default ProductsTopbar
