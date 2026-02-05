import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { type Product } from './ProductsTable'

// --- СХЕМА ВАЛИДАЦИИ ---
const formSchema = z.object({
	name: z.string().min(2, 'Название должно быть не короче 2 символов'),
	// z.coerce.number() превращает строку "100" в число 100
	price: z.coerce.number().min(1, 'Цена должна быть больше 0'),
	category: z.string().min(1, 'Выберите категорию'),
	is_active_str: z.enum(['true', 'false']),
})

function ProductsAdd() {
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: '' as unknown as number,
			category: '',
			is_active_str: 'true',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		// Создаем объект товара
		const newProduct: Product = {
			id: `PROD-${Math.floor(Math.random() * 10000)}`,
			name: data.name,
			price: data.price,
			category: data.category,
			is_active: data.is_active_str === 'true',
		}

		console.group('🚀 Новый товар')
		console.log(newProduct)
		console.groupEnd()

		toast.success('Товар создан', {
			description: `${newProduct.name} успешно добавлен в каталог.`,
		})

		setOpen(false)
		form.reset()
	}

	const content = (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='bg-slate-900 text-white hover:bg-slate-800 gap-2'>
					<Plus size={16} />
					Добавить товар
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Новый товар</DialogTitle>
					<DialogDescription>
						Заполните характеристики товара и нажмите сохранить.
					</DialogDescription>
				</DialogHeader>

				<form id='add-product-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						{/* --- НАЗВАНИЕ --- */}
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='name-input'>Название товара</FieldLabel>
									<Input
										{...field}
										id='name-input'
										placeholder='Например, Apple Watch Series 9'
										autoComplete='off'
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* Группировка: Цена и Категория */}
						<div className='grid grid-cols-2 gap-4'>
							{/* --- ЦЕНА --- */}
							<Controller
								name='price'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='price-input'>Цена (₽)</FieldLabel>
										<Input
											{...field}
											id='price-input'
											placeholder='0'
											type='number'
											min='0'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* --- КАТЕГОРИЯ --- */}
							<Controller
								name='category'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Категория</FieldLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue placeholder='Выберите...' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='Электроника'>
														Электроника
													</SelectItem>
													<SelectItem value='Бытовая техника'>
														Бытовая техника
													</SelectItem>
													<SelectItem value='Мебель'>Мебель</SelectItem>
													<SelectItem value='Компьютеры'>Компьютеры</SelectItem>
													<SelectItem value='Одежда'>Одежда</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						{/* --- СТАТУС --- */}
						<Controller
							name='is_active_str'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Статус наличия</FieldLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger aria-invalid={fieldState.invalid}>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value='true'>
													Активен (в каталоге)
												</SelectItem>
												<SelectItem value='false'>Архив (скрыт)</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>

				<DialogFooter className='pt-4'>
					<Button
						type='button'
						variant='outline'
						onClick={() => {
							form.reset()
							setOpen(false)
						}}
					>
						Отмена
					</Button>
					<Button type='submit' form='add-product-form'>
						Сохранить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ProductsAdd
