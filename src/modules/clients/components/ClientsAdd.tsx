import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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

const formSchema = z.object({
	name: z.string().min(2, 'Имя должно быть не короче 2 символов'),
	email: z.string().email('Введите корректный email'),
	phone: z.string().min(10, 'Минимум 10 цифр'),
	status: z.enum(['Active', 'Pending', 'Inactive', 'Blocked'], {
		required_error: 'Выберите статус',
	}),
	source: z.enum(
		[
			'Google',
			'Yandex',
			'Social Media',
			'Referral',
			'Email',
			'WhatsApp',
			'Walk-in',
		],
		{
			required_error: 'Выберите источник',
		},
	),
})

function ClientsAdd() {
	const [open, setOpen] = useState(false)

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

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const newClient = {
			...data,
			id: `USR-${Math.floor(Math.random() * 10000)}`,
			last_activity_at: new Date().toISOString(),
		}

		console.group('🚀 Данные формы отправлены')
		console.log('Raw Data:', data)
		console.log('Formatted Client:', newClient)
		console.groupEnd()

		setOpen(false)
		form.reset()
	}

	const content = (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='bg-slate-900 text-white hover:bg-slate-800 gap-2'>
					<Plus size={16} />
					Добавить клиента
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>Новый клиент</DialogTitle>
					<DialogDescription>
						Заполните данные. Нажмите сохранить, чтобы добавить клиента.
					</DialogDescription>
				</DialogHeader>

				<form id='add-client-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						{/* --- ИМЯ --- */}
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='name-input'>Имя Фамилия</FieldLabel>
									<Input
										{...field}
										id='name-input'
										placeholder='Александр Иванов'
										autoComplete='name'
										aria-invalid={fieldState.invalid}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* Группировка в 2 колонки */}
						<div className='grid grid-cols-2 gap-4'>
							{/* --- ТЕЛЕФОН --- */}
							<Controller
								name='phone'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='phone-input'>Телефон</FieldLabel>
										<Input
											{...field}
											id='phone-input'
											placeholder='+7 (999)...'
											type='tel'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* --- EMAIL --- */}
							<Controller
								name='email'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor='email-input'>Email</FieldLabel>
										<Input
											{...field}
											id='email-input'
											placeholder='mail@example.com'
											type='email'
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							{/* --- СТАТУС (Select) --- */}
							<Controller
								name='status'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Статус</FieldLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue placeholder='Выберите...' />
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

							{/* --- ИСТОЧНИК (Select) --- */}
							<Controller
								name='source'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>Источник</FieldLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue placeholder='Выберите...' />
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
					<Button type='submit' form='add-client-form'>
						Сохранить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ClientsAdd
