import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import ClientsEdit from './ClientsEdit'
import ClientsPagination from './ClientsPagination'

// --- ТИПЫ ---
export type UserStatus = 'Active' | 'Pending' | 'Inactive' | 'Blocked'
export type UserSource =
	| 'Google'
	| 'Yandex'
	| 'Social Media'
	| 'Referral'
	| 'Email'
	| 'WhatsApp'
	| 'Walk-in'

export interface User {
	id: string
	name: string
	phone: string
	email: string
	status: UserStatus
	source: UserSource
	last_activity_at: string
}

// --- ДАННЫЕ (в реальном приложении приходят с API) ---
const initialUsers: User[] = [
	{
		id: 'USR-001',
		name: 'Алексей Волков',
		phone: '+7 (903) 123-45-67',
		email: 'a.volkov@example.com',
		status: 'Active',
		source: 'WhatsApp',
		last_activity_at: '2024-02-13T09:15:00',
	},
	// ... остальные данные ...
	{
		id: 'USR-002',
		name: 'Ольга Морозова',
		phone: '+7 (916) 987-65-43',
		email: 'olga.morozova@nomail.com',
		status: 'Active',
		source: 'Walk-in',
		last_activity_at: '2024-02-12T14:20:30',
	},
]

// --- КОНФИГ ЦВЕТОВ ---
const statusConfig: Record<UserStatus, { label: string; className: string }> = {
	Active: { label: 'Активен', className: 'bg-green-100 text-green-700' },
	Pending: { label: 'Ожидает', className: 'bg-yellow-100 text-yellow-700' },
	Inactive: { label: 'Неактивен', className: 'bg-slate-100 text-slate-700' },
	Blocked: { label: 'Заблокирован', className: 'bg-red-100 text-red-700' },
}

const sourceConfig: Record<UserSource, { className: string }> = {
	Google: { className: 'bg-blue-50 text-blue-700 border-blue-200' },
	Yandex: { className: 'bg-red-50 text-red-700 border-red-200' },
	WhatsApp: { className: 'bg-green-50 text-green-700 border-green-200' },
	'Social Media': {
		className: 'bg-purple-50 text-purple-700 border-purple-200',
	},
	Referral: { className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
	Email: { className: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Walk-in': { className: 'bg-gray-50 text-gray-700 border-gray-200' },
}

function ClientsTable() {
	const [users, setUsers] = useState<User[]>(initialUsers)

	// Состояние редактирования
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)

	// Состояние удаления
	const [deleteId, setDeleteId] = useState<string | null>(null)

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		})
	}

	const handleEditClick = (user: User) => {
		setEditingUser(user)
		setIsEditOpen(true)
	}

	const handleSaveUser = (updatedUser: User) => {
		setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)))
	}

	const handleDeleteClick = (id: string) => {
		setDeleteId(id)
	}

	const confirmDelete = () => {
		if (deleteId) {
			setUsers(prev => prev.filter(u => u.id !== deleteId))

			toast('Клиент удален', {
				description: 'Запись была успешно удалена из таблицы.',
				action: {
					label: 'Отмена',
					onClick: () => console.log('Undo logic here'),
				},
			})

			setDeleteId(null)
		}
	}

	const content = (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='text-slate-400 h-12'>
						<TableHead className='text-slate-600'>Клиент</TableHead>
						<TableHead className='text-slate-600'>Контакты</TableHead>
						<TableHead className='text-slate-600'>Источник</TableHead>
						<TableHead className='text-slate-600'>Статус</TableHead>
						<TableHead className='text-slate-600'>Активность</TableHead>
						<TableHead className='text-slate-600 text-right'>
							Действия
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.length == 0 ? (
						<TableRow>
							<TableCell
								colSpan={6}
								className='h-24 text-center text-slate-500'
							>
								Данных не найдено
							</TableCell>
						</TableRow>
					) : (
						users.map(user => (
							<TableRow
								key={user.id}
								className='transition-colors hover:bg-muted/50 h-16'
							>
								<TableCell>
									<div className='flex flex-col'>
										<span className='font-medium text-slate-900'>
											{user.name}
										</span>
										<span className='text-xs text-slate-500 hidden sm:inline-block'>
											{user.email}
										</span>
									</div>
								</TableCell>

								<TableCell>
									<span className='text-sm text-slate-600'>{user.phone}</span>
								</TableCell>

								<TableCell>
									<span
										className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
											sourceConfig[user.source]?.className ||
											'bg-gray-50 text-gray-600 border-gray-200'
										}`}
									>
										{user.source}
									</span>
								</TableCell>

								<TableCell>
									<span
										className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
											statusConfig[user.status].className
										}`}
									>
										{statusConfig[user.status].label}
									</span>
								</TableCell>

								<TableCell className='text-slate-600'>
									{formatDate(user.last_activity_at)}
								</TableCell>

								<TableCell className='text-right'>
									<div className='flex items-center justify-end gap-2'>
										<button
											onClick={() => handleEditClick(user)}
											className='p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-md transition-colors'
											title='Редактировать'
										>
											<Pencil className='h-4 w-4' />
										</button>
										<button
											onClick={() => handleDeleteClick(user.id)}
											className='p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md transition-colors'
											title='Удалить'
										>
											<Trash2 className='h-4 w-4' />
										</button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{users.length == 0 ? '' : <ClientsPagination />}

			<ClientsEdit
				user={editingUser}
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
				onSave={handleSaveUser}
			/>

			<AlertDialog
				open={!!deleteId}
				onOpenChange={open => !open && setDeleteId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Удалить клиента?</AlertDialogTitle>
						<AlertDialogDescription>
							Это действие нельзя отменить. Клиент будет удален из списка.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Отмена</AlertDialogCancel>
						<AlertDialogAction
							onClick={confirmDelete}
							className='bg-red-600 hover:bg-red-700'
						>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)

	return content
}

export default ClientsTable
