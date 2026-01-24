// Импорты компонентов shadcn/ui
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'

function ProductsAddProduct() {
	const content = (
		<Dialog>
			<DialogTrigger asChild>
				<button className='flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer'>
					<Plus size={16} />
					Добавить товар
				</button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Новый товар</DialogTitle>
					<DialogDescription>
						Заполните характеристики товара. Нажмите сохранить, чтобы добавить
						его в каталог.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-4 py-4'>
					{/* Название */}
					<div className='flex flex-col gap-2'>
						<Label htmlFor='name' className='text-left'>
							Название
						</Label>
						<Input id='name' placeholder='Например: Apple iPhone 15' />
					</div>

					{/* Категория */}
					<div className='flex flex-col gap-2'>
						<Label htmlFor='category' className='text-left'>
							Категория
						</Label>
						<Select>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите категорию' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='electronics'>Электроника</SelectItem>
									<SelectItem value='clothing'>Одежда</SelectItem>
									<SelectItem value='footwear'>Обувь</SelectItem>
									<SelectItem value='appliances'>Бытовая техника</SelectItem>
									<SelectItem value='other'>Другое</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* Цена и Количество в одну строку */}
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='price'>Цена (₽)</Label>
							<Input id='price' type='number' placeholder='0' />
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='stock'>Количество</Label>
							<Input id='stock' type='number' placeholder='0' />
						</div>
					</div>
				</div>

				<DialogFooter>
					<Button type='submit'>Сохранить товар</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ProductsAddProduct
