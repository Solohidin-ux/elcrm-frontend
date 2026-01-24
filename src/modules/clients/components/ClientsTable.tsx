import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import ClientsPagination from './ClientsPagination'

const clients = [
	{
		id: 'CL-001',
		name: 'Александр Иванов',
		email: 'ivanov@example.com',
		status: 'Active',
		totalSpent: '120 000 ₽',
		lastOrder: '2023-10-15',
	},
	{
		id: 'CL-002',
		name: 'Мария Смирнова',
		email: 'maria.sm@example.com',
		status: 'Pending',
		totalSpent: '45 500 ₽',
		lastOrder: '2023-11-20',
	},
	{
		id: 'CL-003',
		name: 'Дмитрий Петров',
		email: 'd.petrov@example.com',
		status: 'Inactive',
		totalSpent: '0 ₽',
		lastOrder: '2023-05-11',
	},
	{
		id: 'CL-004',
		name: 'Елена Соколова',
		email: 'elena.s@example.com',
		status: 'Active',
		totalSpent: '320 000 ₽',
		lastOrder: '2023-12-01',
	},
	{
		id: 'CL-005',
		name: 'Сергей Кузнецов',
		email: 'kuznetsov@example.com',
		status: 'Active',
		totalSpent: '15 000 ₽',
		lastOrder: '2023-11-05',
	},
]

function ClientsTable() {
	const content = (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='text-slate-400 h-12'>
						<TableHead className='w-[100px] text-slate-600'>ID</TableHead>
						<TableHead className='text-slate-600'>Клиент</TableHead>
						<TableHead className='text-slate-600'>Статус</TableHead>
						<TableHead className='text-slate-600'>Последний заказ</TableHead>
						<TableHead className='text-slate-600 text-right'>
							Сумма покупок
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{clients.map(client => (
						<TableRow
							key={client.id}
							className='transition-colors hover:bg-muted/50 h-12'
						>
							<TableCell className='font-medium'>{client.id}</TableCell>
							<TableCell>
								<span className='font-medium'>{client.name}</span>
							</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
										client.status === 'Active'
											? 'bg-green-100 text-green-800'
											: client.status === 'Pending'
												? 'bg-yellow-100 text-yellow-800'
												: 'bg-gray-100 text-gray-800'
									}`}
								>
									{client.status === 'Active' && 'Активен'}
									{client.status === 'Pending' && 'Ожидает'}
									{client.status === 'Inactive' && 'Неактивен'}
								</span>
							</TableCell>
							<TableCell>{client.lastOrder}</TableCell>
							<TableCell className='text-right font-medium'>
								{client.totalSpent}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<ClientsPagination />
		</div>
	)

	return content
}

export default ClientsTable
