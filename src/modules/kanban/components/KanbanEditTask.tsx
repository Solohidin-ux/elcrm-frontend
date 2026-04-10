import { zodResolver } from '@hookform/resolvers/zod'
import { Check, CheckSquare, Package, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { mockProducts, type ChecklistItem, type Product, type Task } from '@/shared/utils/moc-data'

const formSchema = z.object({
	title: z.string().min(2, 'Минимум 2 символа'),
	description: z.string().optional(),
	priority: z.enum(['low', 'medium', 'high'] as const),
	status: z.enum(['new', 'contacted', 'agreed', 'bought', 'refused'] as const),
	budget: z.string().optional(),
	dateRange: z.string(),
	dateAdded: z.string(),
	deadline: z.string(),
})

interface KanbanEditTaskProps {
	task: Task | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (taskId: Task['id'], updates: Partial<Task>) => void
}

function KanbanEditTask({
	task,
	open,
	onOpenChange,
	onSave,
}: KanbanEditTaskProps) {
	const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
	const [productSearch, setProductSearch] = useState('')
	const [newItemText, setNewItemText] = useState('')

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			priority: 'medium',
			status: 'new',
			budget: '',
			dateRange: '',
			dateAdded: '',
			deadline: '',
		},
	})

	useEffect(() => {
		if (task) {
			form.reset({
				title: task.title,
				description: task.description || '',
				priority: task.priority,
				status: task.status,
				budget: task.budget,
				dateRange: task.dateRange,
				dateAdded: task.dateAdded,
				deadline: task.deadline,
			})
			setChecklistItems(task.checklist || [])
			setSelectedProducts(task.products || [])
		}
	}, [task, form])

	const filteredProducts = useMemo(() => {
		if (!productSearch.trim()) return mockProducts
		const searchLower = productSearch.toLowerCase()
		return mockProducts.filter(
			p =>
				p.name.toLowerCase().includes(searchLower) ||
				p.category.toLowerCase().includes(searchLower),
		)
	}, [productSearch])

	const toggleProduct = (product: Product) => {
		setSelectedProducts(prev => {
			const exists = prev.find(p => p.id === product.id)
			if (exists) {
				return prev.filter(p => p.id !== product.id)
			}
			return [...prev, product]
		})
	}

	const addChecklistItem = () => {
		const text = newItemText.trim()
		if (!text) return
		setChecklistItems(prev => [
			...prev,
			{ id: `new-${Date.now()}`, text, done: false },
		])
		setNewItemText('')
	}

	const removeChecklistItem = (id: string) => {
		setChecklistItems(prev => prev.filter(item => item.id !== id))
	}

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!task) return

		onSave(task.id, {
			...values,
			description: values.description || undefined,
			checklist: checklistItems,
			products: selectedProducts,
		})

		toast.success('Задача обновлена', {
			description: `Данные для "${values.title}" успешно сохранены.`,
		})

		onOpenChange(false)
	}

	if (!task) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Редактирование сделки</DialogTitle>
					<DialogDescription>
						Измените данные сделки, выберите товары и нажмите сохранить.
					</DialogDescription>
				</DialogHeader>

				<form id='edit-task-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						<Controller
							name='title'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Название</FieldLabel>
									<Input {...field} placeholder='Название сделки' />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name='description'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Описание</FieldLabel>
									<Input {...field} placeholder='Описание' />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<div className='grid grid-cols-2 gap-4'>
							<Controller
								name='priority'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Приоритет</FieldLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='low'>Низкий</SelectItem>
													<SelectItem value='medium'>Средний</SelectItem>
													<SelectItem value='high'>Высокий</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								name='status'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Статус</FieldLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='new'>Новый</SelectItem>
													<SelectItem value='contacted'>Связались</SelectItem>
													<SelectItem value='agreed'>Договорились</SelectItem>
													<SelectItem value='bought'>Купил</SelectItem>
													<SelectItem value='refused'>Отказ</SelectItem>
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

						<div className='grid grid-cols-2 gap-4'>
							<Controller
								name='dateAdded'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Дата добавления</FieldLabel>
										<Input type='date' {...field} />
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<Controller
								name='deadline'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Дедлайн</FieldLabel>
										<Input type='date' {...field} />
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						<Controller
							name='dateRange'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Период</FieldLabel>
									<Input {...field} placeholder='15 дек. - 26 янв.' />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name='budget'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Бюджет</FieldLabel>
									<Input {...field} placeholder='450 000 ₽' />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* Чек-лист */}
						<div className='flex flex-col gap-2'>
							<Label className='flex items-center gap-2'>
								<CheckSquare className='h-4 w-4' />
								Чек-лист
							</Label>
							<div className='flex gap-2'>
								<Input
									placeholder='Добавить пункт...'
									value={newItemText}
									onChange={e => setNewItemText(e.target.value)}
									onKeyDown={e => {
										if (e.key === 'Enter') {
											e.preventDefault()
											addChecklistItem()
										}
									}}
								/>
								<Button
									type='button'
									variant='outline'
									size='icon'
									className='shrink-0'
									onClick={addChecklistItem}
								>
									<Plus className='h-4 w-4' />
								</Button>
							</div>
							{checklistItems.length > 0 && (
								<ul className='mt-2 space-y-2 rounded-md border bg-muted/30 p-2 max-h-32 overflow-y-auto'>
									{checklistItems.map(item => (
										<li
											key={item.id}
											className='flex items-center gap-2 text-sm group'
										>
											<button
												type='button'
												onClick={() => {
													setChecklistItems(prev =>
														prev.map(i =>
															i.id === item.id ? { ...i, done: !i.done } : i,
														),
													)
												}}
												className={cn(
													'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer',
													item.done
														? 'border-primary bg-primary text-primary-foreground'
														: 'border-slate-300 bg-background hover:border-primary',
												)}
											>
												{item.done ? (
													<Check className='h-2.5 w-2.5' strokeWidth={3} />
												) : null}
											</button>
											<span
												className={cn(
													'flex-1',
													item.done && 'line-through text-slate-400',
												)}
											>
												{item.text}
											</span>
											<Button
												type='button'
												variant='ghost'
												size='icon'
												className='h-7 w-7 shrink-0 opacity-60 group-hover:opacity-100 text-destructive hover:text-destructive'
												onClick={() => removeChecklistItem(item.id)}
											>
												<Trash2 className='h-3.5 w-3.5' />
											</Button>
										</li>
									))}
								</ul>
							)}
						</div>

						{/* Товары */}
						<div className='flex flex-col gap-2'>
							<Label className='flex items-center gap-2'>
								<Package className='h-4 w-4' />
								Товары ({selectedProducts.length})
							</Label>

							{/* Поиск товаров */}
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
								<Input
									placeholder='Поиск товаров...'
									value={productSearch}
									onChange={e => setProductSearch(e.target.value)}
									className='pl-9'
								/>
							</div>

							{/* Список товаров с чекбоксами */}
							<div className='border rounded-md bg-muted/30 p-2 max-h-48 overflow-y-auto'>
								{filteredProducts.length === 0 ? (
									<p className='text-sm text-muted-foreground text-center py-4'>
										Товары не найдены
									</p>
								) : (
									<div className='space-y-2'>
										{filteredProducts.map(product => {
											const isSelected = selectedProducts.some(
												p => p.id === product.id,
											)
											return (
												<label
													key={product.id}
													className='flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer group'
												>
													<input
														type='checkbox'
														checked={isSelected}
														onChange={() => toggleProduct(product)}
														className='h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary'
													/>
													<div className='flex-1 min-w-0'>
														<p className='text-sm font-medium truncate'>
															{product.name}
														</p>
														<div className='flex items-center gap-2 mt-0.5'>
															<span className='text-xs text-muted-foreground'>
																{product.category}
															</span>
															<span className='text-xs font-medium'>
																{new Intl.NumberFormat('ru-RU', {
																	style: 'currency',
																	currency: 'RUB',
																	maximumFractionDigits: 0,
																}).format(product.price)}
															</span>
														</div>
													</div>
												</label>
											)
										})}
									</div>
								)}
							</div>

							{/* Выбранные товары */}
							{selectedProducts.length > 0 && (
								<div className='mt-2'>
									<p className='text-xs font-medium text-muted-foreground mb-2'>
										Выбранные товары:
									</p>
									<div className='flex flex-wrap gap-2'>
										{selectedProducts.map(product => (
											<span
												key={product.id}
												className='inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'
											>
												{product.name}
												<button
													type='button'
													onClick={() => toggleProduct(product)}
													className='hover:text-blue-900'
												>
													×
												</button>
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</FieldGroup>
				</form>

				<DialogFooter>
					<Button
						type='button'
						variant='outline'
						onClick={() => onOpenChange(false)}
					>
						Отмена
					</Button>
					<Button type='submit' form='edit-task-form'>
						Сохранить изменения
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default KanbanEditTask
