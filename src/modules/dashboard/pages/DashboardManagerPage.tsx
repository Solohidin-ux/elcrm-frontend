import { ArrowRight, CheckCircle, Clock, Phone } from 'lucide-react'
import { DashboardCard, StatusBadge } from '../components/DashboardUI.tsx'

// MOCK DATA
const TASKS = [
	{
		id: 1,
		title: 'Перезвонить Сергею (ООО Ромашка)',
		due: '14:00',
		type: 'call',
		urgent: true,
	},
	{
		id: 2,
		title: 'Отправить КП для TechCorp',
		due: '15:30',
		type: 'email',
		urgent: false,
	},
	{
		id: 3,
		title: 'Закрыть сделку по "СтройГрупп"',
		due: '17:00',
		type: 'deal',
		urgent: false,
	},
]

function DashboardManagerPage() {
	const content = (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex justify-between items-end'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>Мои задачи</h2>
					<p className='text-muted-foreground'>Вторник, 8 Февраля</p>
				</div>
				<div className='text-right hidden md:block'>
					<div className='text-sm text-muted-foreground'>Мой план</div>
					<div className='font-bold text-lg text-primary'>450k / 800k ₽</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Левая колонка: ЗАДАЧИ (Главное) */}
				<div className='lg:col-span-2 space-y-6'>
					<DashboardCard className='p-0 overflow-hidden'>
						<div className='bg-muted/50 p-4 border-b flex justify-between items-center'>
							<h3 className='font-bold flex items-center gap-2'>
								<Clock className='w-5 h-5 text-primary' />
								План на сегодня
							</h3>
							<StatusBadge variant='destructive'>3 срочно</StatusBadge>
						</div>
						<div className='divide-y'>
							{TASKS.map(task => (
								<div
									key={task.id}
									className='p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer group'
								>
									<div className='flex items-center gap-3'>
										{/* Индикатор срочности */}
										<div
											className={`w-2 h-2 rounded-full ${task.urgent ? 'bg-destructive' : 'bg-primary'}`}
										/>
										<div>
											<div className='font-medium group-hover:text-primary transition-colors'>
												{task.title}
											</div>
											<div className='text-xs text-muted-foreground flex items-center gap-1'>
												{task.type === 'call' && <Phone className='w-3 h-3' />}
												До {task.due}
											</div>
										</div>
									</div>
									<button className='h-8 w-8 flex items-center justify-center rounded-full border border-input hover:bg-primary hover:text-primary-foreground transition-all'>
										<CheckCircle className='w-4 h-4' />
									</button>
								</div>
							))}
						</div>
						<div className='p-3 text-center text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors bg-muted/20'>
							Показать выполненные (5)
						</div>
					</DashboardCard>
				</div>

				{/* Правая колонка: Ускорители и Активность */}
				<div className='space-y-6'>
					{/* Карточка "Ускорители" - подсказывает где деньги */}
					<DashboardCard className='p-5 bg-primary text-primary-foreground border-primary'>
						<h3 className='font-bold mb-4'>Где лежат деньги?</h3>
						<ul className='space-y-3 text-sm'>
							<li className='flex justify-between items-center opacity-90'>
								<span>Клиенты без задач</span>
								<span className='px-2 py-0.5 bg-white/20 rounded font-bold'>
									12
								</span>
							</li>
							<li className='flex justify-between items-center opacity-90'>
								<span>Зависшие сделки</span>
								<span className='px-2 py-0.5 bg-white/20 rounded font-bold'>
									5
								</span>
							</li>
							<li className='pt-4'>
								<button className='w-full py-2 bg-white text-primary rounded-md font-bold hover:bg-white/90 transition-colors'>
									Взять в работу
								</button>
							</li>
						</ul>
					</DashboardCard>

					{/* Последняя активность */}
					<DashboardCard className='p-5'>
						<h3 className='font-bold mb-3 text-sm uppercase text-muted-foreground'>
							История действий
						</h3>
						<div className='space-y-4'>
							<div className='flex gap-3 text-sm'>
								<div className='mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0' />
								<div>
									<p className='font-medium'>Звонок: ООО "Альфа"</p>
									<p className='text-xs text-muted-foreground'>
										10 минут назад
									</p>
								</div>
							</div>
							<div className='flex gap-3 text-sm'>
								<div className='mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0' />
								<div>
									<p className='font-medium'>КП отправлено: ИП Петров</p>
									<p className='text-xs text-muted-foreground'>
										35 минут назад
									</p>
								</div>
							</div>
						</div>
						<button className='w-full mt-4 flex items-center justify-center gap-1 text-sm text-primary hover:underline'>
							Вся история <ArrowRight className='w-3 h-3' />
						</button>
					</DashboardCard>
				</div>
			</div>
		</div>
	)

	return content
}

export default DashboardManagerPage
