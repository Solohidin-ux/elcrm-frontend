import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
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
import { useClientsStore } from '@/shared/store/clients-store'
import {
	managers,
	type ClientSource,
	type ClientStatus,
} from '@/shared/types/client'

const formSchema = z.object({
	name: z.string().min(2, 'Имя должно быть не короче 2 символов'),
	email: z.string().email('Введите корректный email'),
	phone: z.string().min(10, 'Минимум 10 цифр'),
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
})

function ClientsAdd() {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const { addClient } = useClientsStore()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			status: 'active',
			source: 'Walk-in',
			managerId: 'not_assigned',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		const selectedManager = managers.find(m => m.id === data.managerId)

		addClient({
			name: data.name,
			email: data.email,
			phone: data.phone,
			status: data.status,
			source: data.source,
			managerId:
				data.managerId && data.managerId !== 'not_assigned'
					? data.managerId
					: undefined,
			managerName: selectedManager?.name || undefined,
			lastContactAt: new Date().toISOString(),
		})

		toast.success(t('clients.clientAdded'), {
			description: `${data.name} успешно добавлен в список клиентов.`,
		})

		setOpen(false)
		form.reset()
	}

	const content = (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='bg-primary text-white hover:bg-primary/80 gap-2 cursor-pointer'>
					<Plus size={16} />
					{t('clients.addClient')}
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[500px]'>
				<DialogHeader>
					<DialogTitle>{t('clients.newClient')}</DialogTitle>
				</DialogHeader>

				<form id='add-client-form' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-4'>
						{/* --- ИМЯ --- */}
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='name-input'>
										{t('clients.form.name')}
									</FieldLabel>
									<Input
										{...field}
										id='name-input'
										placeholder={t('clients.form.namePlaceholder')}
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
										<FieldLabel htmlFor='phone-input'>
											{t('clients.form.phone')}
										</FieldLabel>
										<Input
											{...field}
											id='phone-input'
											placeholder={t('clients.form.phonePlaceholder')}
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
										<FieldLabel htmlFor='email-input'>
											{t('clients.form.email')}
										</FieldLabel>
										<Input
											{...field}
											id='email-input'
											placeholder={t('clients.form.emailPlaceholder')}
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
										<FieldLabel>{t('clients.table.status')}</FieldLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue placeholder='Выберите...' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{(
														[
															'active',
															'pending',
															'in_progress',
															'archived',
														] as ClientStatus[]
													).map(status => (
														<SelectItem key={status} value={status}>
															{t(`clients.statuses.${status}`)}
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

							{/* --- ИСТОЧНИК (Select) --- */}
							<Controller
								name='source'
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel>{t('clients.form.source')}</FieldLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger aria-invalid={fieldState.invalid}>
												<SelectValue placeholder='Выберите...' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{(
														[
															'Google',
															'Yandex',
															'WhatsApp',
															'Social Media',
															'Walk-in',
															'Referral',
															'Email',
														] as ClientSource[]
													).map(source => (
														<SelectItem key={source} value={source}>
															{t(`clients.sources.${source}`)}
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
						</div>

						{/* --- МЕНЕДЖЕР --- */}
						<Controller
							name='managerId'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>{t('clients.form.manager')}</FieldLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value || undefined}
									>
										<SelectTrigger aria-invalid={fieldState.invalid}>
											<SelectValue
												placeholder={t('clients.form.selectManager')}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value='not_assigned'>
													{t('clients.form.noManager')}
												</SelectItem>
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

				<DialogFooter className='pt-4'>
					<Button
						type='button'
						variant='outline'
						onClick={() => {
							form.reset()
							setOpen(false)
						}}
					>
						{t('common.cancel')}
					</Button>
					<Button type='submit' form='add-client-form'>
						{t('clients.form.save')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ClientsAdd
