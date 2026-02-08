import {
	AlertTriangle,
	ArrowRight,
	BarChart3,
	CheckCircle2,
	Clock,
	MoreHorizontal,
	Phone,
	TrendingDown,
	TrendingUp,
	Wallet,
} from 'lucide-react'
import {
	DashboardCard,
	SimpleProgress,
	StatusBadge,
} from '../components/DashboardUI'

// --- MOCK DATA ---

const STATS = {
	revenue: { today: 120000, month: 4500000, plan: 6000000 },
	forecast: { value: 5800000, onTrack: false },
	lost: { month: 340000, today: 15000 },
	deals: { active: 45, stuck: 8 },
}

const ALERTS = [
	{ id: 1, type: 'critical', msg: 'Иван: 0 звонков за сегодня' },
	{ id: 2, type: 'warning', msg: 'Сделка "Вектор" висит 5 дней без движения' },
]

const MANAGERS = [
	{ name: 'Алексей', sales: 1200000, calls: 45, stuck: 1, status: 'good' },
	{ name: 'Мария', sales: 850000, calls: 32, stuck: 2, status: 'normal' },
	{ name: 'Сергей', sales: 420000, calls: 12, stuck: 5, status: 'bad' },
	{ name: 'Иван', sales: 0, calls: 0, stuck: 8, status: 'critical' },
]

const STUCK_DEALS = [
	{ client: 'ООО "СтройМаш"', amount: 1500000, days: 14, manager: 'Сергей' },
	{ client: 'ИП Воронов', amount: 350000, days: 8, manager: 'Иван' },
	{ client: 'Tech Solutions', amount: 890000, days: 6, manager: 'Иван' },
]

function DashboardOwnerPage() {
	const percentPlan = Math.round(
		(STATS.revenue.month / STATS.revenue.plan) * 100,
	)

	const content = (
		<div className='space-y-6 animate-in fade-in duration-500'>
			{/* 1. Header & Alerts */}
			<div className='flex flex-col md:flex-row gap-4 justify-between items-start'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight text-foreground'>
						Обзор бизнеса
					</h2>
				</div>

				{/* Тревожные сигналы (Компактнее) */}
				<div className='w-full md:w-auto flex flex-col gap-2'>
					{ALERTS.map(alert => (
						<div
							key={alert.id}
							className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium shadow-sm ${
								alert.type === 'critical'
									? 'bg-red-500 text-white border-red=500'
									: 'bg-amber-100 text-amber-800 border-amber-200'
							}`}
						>
							<AlertTriangle className='w-4 h-4' />
							{alert.msg}
						</div>
					))}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				{/* Выручка */}
				<DashboardCard className='p-5 relative overflow-hidden'>
					<div className='flex justify-between items-start mb-2'>
						<span className='text-muted-foreground text-sm font-medium'>
							Выручка (Месяц)
						</span>
						<Wallet className='w-5 h-5 text-primary' />
					</div>
					<div className='text-2xl font-bold'>
						{STATS.revenue.month.toLocaleString()} ₽
					</div>
					<div className='mt-4'>
						<div className='flex justify-between text-xs mb-1 text-muted-foreground'>
							<span>Факт</span>
							<span>План: {STATS.revenue.plan.toLocaleString()}</span>
						</div>
						<SimpleProgress
							value={STATS.revenue.month}
							max={STATS.revenue.plan}
							className='bg-primary'
						/>
						<div className='text-right text-xs font-bold mt-1 text-primary'>
							{percentPlan}% выполнено
						</div>
					</div>
				</DashboardCard>

				{/* Прогноз */}
				<DashboardCard className='p-5'>
					<div className='flex justify-between items-start mb-2'>
						<span className='text-muted-foreground text-sm font-medium'>
							Прогноз
						</span>
						<TrendingUp className='w-5 h-5 text-muted-foreground' />
					</div>
					<div
						className={`text-2xl font-bold ${
							STATS.forecast.onTrack ? 'text-green-600' : 'text-amber-600'
						}`}
					>
						{STATS.forecast.value.toLocaleString()} ₽
					</div>
					<p className='text-xs text-muted-foreground mt-2'>
						При текущей скорости продаж мы{' '}
						<span className='font-medium text-foreground'>
							{STATS.forecast.onTrack ? 'выполним' : 'не выполним'}
						</span>{' '}
						план к концу месяца.
					</p>
				</DashboardCard>

				{/* ПОТЕРИ */}
				<DashboardCard className='p-5 border-destructive/30 bg-destructive/5'>
					<div className='flex justify-between items-start mb-2'>
						<span className='text-destructive font-bold text-sm'>
							УПУЩЕННАЯ ПРИБЫЛЬ
						</span>
						<TrendingDown className='w-5 h-5 text-destructive' />
					</div>
					<div className='text-2xl font-bold text-destructive'>
						{STATS.lost.month.toLocaleString()} ₽
					</div>
					<div className='flex items-center gap-2 mt-3 text-xs text-destructive/80 font-medium'>
						<div className='w-2 h-2 rounded-full bg-destructive animate-pulse' />
						Сегодня потеряно: -{STATS.lost.today.toLocaleString()} ₽
					</div>
				</DashboardCard>

				{/* Активность сегодня */}
				<DashboardCard className='p-5'>
					<div className='flex justify-between items-start mb-2'>
						<span className='text-muted-foreground text-sm font-medium'>
							Касса сегодня
						</span>
						<CheckCircle2 className='w-5 h-5 text-green-600' />
					</div>
					<div className='text-2xl font-bold'>
						{STATS.revenue.today.toLocaleString()} ₽
					</div>
					<div className='mt-3 flex flex-wrap gap-2'>
						<StatusBadge variant='destructive'>
							{STATS.deals.stuck} сделок зависло
						</StatusBadge>
						<StatusBadge variant='outline'>
							{STATS.deals.active} в работе
						</StatusBadge>
					</div>
				</DashboardCard>
			</div>

			{/* 3. Детальная аналитика  */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* ЛЕВАЯ КОЛОНКА: Пульс команды  */}
				<DashboardCard className='lg:col-span-2 p-0 overflow-hidden'>
					<div className='p-5 border-b flex justify-between items-center bg-muted/30'>
						<h3 className='font-bold text-lg flex items-center gap-2'>
							<BarChart3 className='w-5 h-5 text-primary' />
							Эффективность менеджеров
						</h3>
						<button className='text-sm text-primary hover:underline'>
							Подробнее
						</button>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full text-sm text-left'>
							<thead className='bg-muted/50 text-muted-foreground'>
								<tr>
									<th className='px-5 py-3 font-medium'>Менеджер</th>
									<th className='px-5 py-3 font-medium'>Продажи</th>
									<th className='px-5 py-3 font-medium'>Звонки</th>
									<th className='px-5 py-3 font-medium'>Зависшие</th>
									<th className='px-5 py-3 font-medium text-right'>Статус</th>
								</tr>
							</thead>
							<tbody className='divide-y'>
								{MANAGERS.map((m, i) => (
									<tr key={i} className='hover:bg-muted/20 transition-colors'>
										<td className='px-5 py-4 font-medium'>{m.name}</td>
										<td className='px-5 py-4 font-bold'>
											{m.sales.toLocaleString()} ₽
										</td>
										<td className='px-5 py-4'>
											<div className='flex items-center gap-2'>
												<Phone className='w-3 h-3 text-muted-foreground' />
												{m.calls}
											</div>
										</td>
										<td className='px-5 py-4'>
											{m.stuck > 0 ? (
												<span className='text-destructive font-bold'>
													{m.stuck}
												</span>
											) : (
												<span className='text-muted-foreground'>-</span>
											)}
										</td>
										<td className='px-5 py-4 text-right'>
											{m.status === 'good' && (
												<StatusBadge variant='success'>Отлично</StatusBadge>
											)}
											{m.status === 'normal' && (
												<StatusBadge variant='outline'>Норма</StatusBadge>
											)}
											{m.status === 'bad' && (
												<StatusBadge variant='default'>Слабо</StatusBadge>
											)}
											{m.status === 'critical' && (
												<StatusBadge variant='destructive'>
													Внимание
												</StatusBadge>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</DashboardCard>

				{/* ПРАВАЯ КОЛОНКА: Где застряли большие деньги */}
				<div className='space-y-6'>
					{/* Самые крупные зависшие сделки */}
					<DashboardCard className='p-5 border-l-4 border-l-destructive shadow-sm'>
						<div className='flex items-center gap-2 mb-4'>
							<Clock className='w-5 h-5 text-destructive' />
							<h3 className='font-bold text-foreground'>
								Деньги в "заморозке"
							</h3>
						</div>
						<div className='space-y-4'>
							{STUCK_DEALS.map((deal, i) => (
								<div
									key={i}
									className='flex justify-between items-center p-3 bg-muted/40 rounded-lg'
								>
									<div>
										<div className='font-bold text-sm'>{deal.client}</div>
										<div className='text-xs text-muted-foreground'>
											Ждет:{' '}
											<span className='text-destructive font-bold'>
												{deal.days} дней
											</span>{' '}
											• {deal.manager}
										</div>
									</div>
									<div className='text-right'>
										<div className='font-bold text-sm'>
											{deal.amount.toLocaleString()}
										</div>
										<ArrowRight className='w-4 h-4 ml-auto text-muted-foreground cursor-pointer hover:text-primary mt-1' />
									</div>
								</div>
							))}
						</div>
						<button className='w-full mt-4 text-xs font-medium text-destructive border border-destructive/20 rounded py-2 hover:bg-destructive/10 transition-colors cursor-pointer'>
							Предупредить всех менеджеров
						</button>
					</DashboardCard>

					{/* Здоровье воронки  */}
					<DashboardCard className='p-5'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='font-bold text-sm'>Потери на этапах</h3>
							<MoreHorizontal className='w-4 h-4 text-muted-foreground' />
						</div>
						<div className='space-y-3'>
							<div>
								<div className='flex justify-between text-xs mb-1'>
									<span>Лид → Звонок</span>
									<span className='text-green-600 font-bold'>95%</span>
								</div>
								<SimpleProgress value={95} max={100} className='bg-green-500' />
							</div>
							<div>
								<div className='flex justify-between text-xs mb-1'>
									<span>Звонок → КП</span>
									<span className='text-amber-500 font-bold'>60%</span>
								</div>
								<SimpleProgress value={60} max={100} className='bg-amber-500' />
							</div>
							<div>
								<div className='flex justify-between text-xs mb-1'>
									<span>КП → Оплата</span>
									<span className='text-destructive font-bold'>15%</span>
								</div>
								<SimpleProgress
									value={15}
									max={100}
									className='bg-destructive'
								/>
								<p className='text-[10px] text-destructive mt-1 text-right'>
									Критический этап!
								</p>
							</div>
						</div>
					</DashboardCard>
				</div>
			</div>
		</div>
	)

	return content
}

export default DashboardOwnerPage
