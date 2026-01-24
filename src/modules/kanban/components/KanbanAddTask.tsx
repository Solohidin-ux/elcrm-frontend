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
import { useState } from 'react'

function KanbanAddTask() {
	const [open, setOpen] = useState(false)

	const content = (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button className='flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer'>
					<Plus size={16} />
					Новая задача
				</button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Создать задачу</DialogTitle>
					<DialogDescription>
						Добавьте новую задачу в проект. Заполните обязательные поля и
						нажмите создать.
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-4 py-4'>
					<div className='flex flex-col gap-4'>
						<Label htmlFor='title' className='text-left'>
							Название
						</Label>
						<Input id='title' placeholder='Например: Разработка API' />
					</div>

					<div className='flex flex-col gap-4'>
						<Label htmlFor='budget' className='text-left'>
							Бюджет
						</Label>
						<Input id='budget' placeholder='50 000 ₽' />
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-4'>
							<Label htmlFor='priority'>Приоритет</Label>
							<Select defaultValue='medium'>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Выберите' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='low'>Низкий</SelectItem>
										<SelectItem value='medium'>Средний</SelectItem>
										<SelectItem value='high'>Высокий</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className='flex flex-col gap-4'>
							<Label htmlFor='status'>Статус</Label>
							<Select defaultValue='planned'>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Выберите' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='planned'>В планах</SelectItem>
										<SelectItem value='in_progress'>В работе</SelectItem>
										<SelectItem value='done'>Готово</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className='flex flex-col gap-4'>
						<Label htmlFor='description' className='text-left'>
							Описание
						</Label>
						<Input id='description' placeholder='Краткое описание задачи' />
					</div>
				</div>

				<DialogFooter>
					<Button type='submit' onClick={() => setOpen(false)}>
						Создать задачу
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)

	return content
}

export default KanbanAddTask
