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
// Используем ваши кастомные Field компоненты
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
import { type User } from './ClientsTable'

// Схема валидации
const formSchema = z.object({
	name: z.string().min(2, 'Минимум 2 символа'),
	email: z.string().email('Некорректный email'),
	phone: z.string().min(10, 'Некорректный телефон'),
	status: z.enum(['Active', 'Pending', 'Inactive', 'Blocked'] as const),
	source: z.enum([
		'Google',
		'Yandex',
		'Social Media',
		'Referral',
		'Email',
		'WhatsApp',
		'Walk-in',
	] as const),
})

interface ClientsEditClientProps {
	user: User | null
	open: boolean
	onOpenChange: (open: boolean) => void
	onSave: (updatedUser: User) => void
}

export function ClientsEditClient({
	user,
	open,
	onOpenChange,
	onSave,
}: ClientsEditClientProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			status: 'Active',
			source: 'Walk-in',
		},
	})

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name,
				email: user.email,
				phone: user.phone,
				status: user.status,
				source: user.source,
			})
		}
	}, [user, form])

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!user) return

		const updatedUser: User = {
			...user,
			...values,
		}

		onSave(updatedUser)

		toast.success('Клиент обновлен', {
			description: `Данные для ${values.name} успешно сохранены.`,
		})

		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Редактирование клиента</DialogTitle>
					<DialogDescription>
						Измените данные и нажмите сохранить.
					</DialogDescription>
				</DialogHeader>

				<form id='edit-client-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						{/* ИМЯ */}
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Имя Фамилия</FieldLabel>
									<Input
										{...field}
										placeholder='Иван Иванов'
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<div className='grid grid-cols-2 gap-4'>
							{/* ТЕЛЕФОН */}
							<Controller
								name='phone'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Телефон</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* EMAIL */}
							<Controller
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Email</FieldLabel>
										<Input {...field} aria-invalid={fieldState.invalid} />
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							{/* СТАТУС */}
							<Controller
								name='status'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Статус</FieldLabel>
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
													<SelectItem value='Active'>Активен</SelectItem>
													<SelectItem value='Pending'>Ожидает</SelectItem>
													<SelectItem value='Inactive'>Неактивен</SelectItem>
													<SelectItem value='Blocked'>Заблокирован</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* ИСТОЧНИК */}
							<Controller
								name='source'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Источник</FieldLabel>
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
													<SelectItem value='Google'>Google</SelectItem>
													<SelectItem value='Yandex'>Yandex</SelectItem>
													<SelectItem value='WhatsApp'>WhatsApp</SelectItem>
													<SelectItem value='Social Media'>Соцсети</SelectItem>
													<SelectItem value='Walk-in'>Пришел сам</SelectItem>
													<SelectItem value='Referral'>Рекомендация</SelectItem>
													<SelectItem value='Email'>Email</SelectItem>
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
					</FieldGroup>
				</form>

				<DialogFooter>
					<Button type='submit' form='edit-client-form'>
						Сохранить изменения
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
