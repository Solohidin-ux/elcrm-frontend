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

function ClientsAddClient() {
	const content = (
		<Dialog>
			<DialogTrigger asChild>
				<button className='flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer'>
					<Plus size={16} />
					Добавить клиента
				</button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Новый клиент</DialogTitle>
					<DialogDescription>
						Заполните данные клиента. Нажмите сохранить, чтобы добавить его в
						базу.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-4 py-4'>
					<div className='flex flex-col  gap-4'>
						<Label htmlFor='name' className='text-right'>
							Имя
						</Label>
						<Input id='name' placeholder='Александр Иванов' />
					</div>
					<div className='flex flex-col  gap-4'>
						<Label htmlFor='email'>Почта</Label>
						<Input
							id='email'
							type='email'
							placeholder='ivanov@example.com'
							className='col-span-3'
						/>
					</div>
					<div className='flex flex-col  gap-4'>
						<Label htmlFor='status' className='text-right'>
							Статус
						</Label>

						<Select defaultValue='active'>
							<SelectTrigger className='w-full'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='active'>Активен</SelectItem>
									<SelectItem value='pending'>Ожидает</SelectItem>
									<SelectItem value='inactive'>Неактивен</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button type='submit'>Сохранить изменения</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default ClientsAddClient
