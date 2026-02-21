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
import { useClientsStore } from '@/shared/store/clients-store'
import {
	managers,
	type Client,
	type ClientSource,
	type ClientStatus,
} from '@/shared/types/client'

// Схема валидации
const formSchema = z.object({
	name: z.string().min(2, 'Минимум 2 символа'),
	email: z.string().email('Некорректный email'),
	phone: z.string().min(10, 'Некорректный телефон'),
	status: z.enum(['active', 'pending', 'in_progress', 'archived'] as const),
	source: z.enum([
		'Google',
		'Yandex',
		'Social Media',
		'Referral',
		'Email',
		'WhatsApp',
		'Walk-in',
	] as const),
	managerId: z.string().optional(),
	managerName: z.string().optional(),
})

interface ClientsEditProps {
	client: Client | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

function ClientsEdit({ client, open, onOpenChange }: ClientsEditProps) {
	const { updateClient } = useClientsStore()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			status: 'active',
			source: 'Walk-in',
			managerId: '',
			managerName: '',
		},
	})

	useEffect(() => {
		if (client) {
			form.reset({
				name: client.name,
				email: client.email,
				phone: client.phone,
				status: client.status,
				source: client.source,
				managerId: client.managerId || '',
				managerName: client.managerName || '',
			})
		}
	}, [client, form])

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		if (!client) return

		// Находим имя менеджера по ID
		const selectedManager = managers.find(m => m.id === values.managerId)

		updateClient(client.id, {
			...values,
			managerName: selectedManager?.name || values.managerName,
		})

		toast.success('Клиент обновлен', {
			description: `Данные для ${values.name} успешно сохранены.`,
		})

		onOpenChange(false)
	}

	const statusLabels: Record<ClientStatus, string> = {
		active: 'Активный',
		pending: 'Ожидает',
		in_progress: 'В процессе',
		archived: 'Архив',
	}

	const sourceLabels: Record<ClientSource, string> = {
		Google: 'Google',
		Yandex: 'Yandex',
		WhatsApp: 'WhatsApp',
		'Social Media': 'Соцсети',
		'Walk-in': 'Пришел сам',
		Referral: 'Рекомендация',
		Email: 'Email',
	}

	const content = (
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
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{(Object.keys(statusLabels) as ClientStatus[]).map(
														status => (
															<SelectItem key={status} value={status}>
																{statusLabels[status]}
															</SelectItem>
														),
													)}
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
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{(Object.keys(sourceLabels) as ClientSource[]).map(
														source => (
															<SelectItem key={source} value={source}>
																{sourceLabels[source]}
															</SelectItem>
														),
													)}
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

						{/* МЕНЕДЖЕР */}
						<Controller
							name='managerId'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Ответственный менеджер</FieldLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger aria-invalid={fieldState.invalid}>
											<SelectValue placeholder='Выберите менеджера' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value=''>Не назначен</SelectItem>
												{managers.map(manager => (
													<SelectItem key={manager.id} value={manager.id}>
														{manager.name}
													</SelectItem>
												))}
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
					<Button type='submit' form='edit-client-form'>
						Сохранить изменения
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ClientsEdit
