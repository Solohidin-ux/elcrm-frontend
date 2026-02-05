import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
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
	name: z.string().min(2, 'Минимум 2 символа'),
	// z.coerce.number() автоматически преобразует строку из input в число
	price: z.coerce.number().min(1, 'Цена должна быть больше 0'),
	category: z.string().min(1, 'Выберите категорию'),
	// Для Select используем строку, потом конвертируем в boolean
	is_active_str: z.enum(['true', 'false']),
})

interface ProductsEditProps {
	product: Product | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (updatedProduct: Product) => void
}

function ProductsEdit({
	product,
	open,
	onOpenChange,
	onSave,
}: ProductsEditProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			price: 0,
			category: '',
			is_active_str: 'true',
		},
	})

	useEffect(() => {
		if (product) {
			form.reset({
				name: product.name,
				price: product.price,
				category: product.category,
				is_active_str: product.is_active ? 'true' : 'false',
			})
		}
	}, [product, form])

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!product) return

		const updatedProduct: Product = {
			...product,
			name: values.name,
			price: values.price,
			category: values.category,
			is_active: values.is_active_str === 'true',
		}

		onSave(updatedProduct)

		toast.success('Товар обновлен', {
			description: `Данные для "${values.name}" успешно сохранены.`,
		})

		onOpenChange(false)
	}

	const content = (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Редактирование товара</DialogTitle>
					<DialogDescription>
						Измените характеристики товара и нажмите сохранить.
					</DialogDescription>
				</DialogHeader>

				<form id='edit-product-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						{/* НАЗВАНИЕ */}
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Название товара</FieldLabel>
									<Input
										{...field}
										placeholder='Например, Sony WH-1000XM5'
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<div className='grid grid-cols-2 gap-4'>
							{/* ЦЕНА */}
							<Controller
								name='price'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Цена (₽)</FieldLabel>
										<Input
											type='number'
											{...field}
											placeholder='0'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* КАТЕГОРИЯ */}
							<Controller
								name='category'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Категория</FieldLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value}
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

						{/* СТАТУС */}
						<Controller
							name='is_active_str'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Статус наличия</FieldLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
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

				<DialogFooter>
					<Button type='submit' form='edit-product-form'>
						Сохранить изменения
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ProductsEdit
