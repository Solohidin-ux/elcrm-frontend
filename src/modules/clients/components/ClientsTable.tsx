import { Archive, ArchiveRestore, Eye, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { UrlNames } from '@/shared/enums/UrlNames'
import { useClientsStore } from '@/shared/store/clients-store'
import { clientStatusConfig, type Client } from '@/shared/types/client'
import ClientsEdit from './ClientsEdit'
import ClientsPagination from './ClientsPagination'

function ClientsTable() {
	const navigate = useNavigate()
	const { filteredClients, deleteClient, moveToArchive, restoreFromArchive } =
		useClientsStore()

	// Состояние редактирования
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [editingClient, setEditingClient] = useState<Client | null>(null)

	// Состояние удаления
	const [deleteId, setDeleteId] = useState<string | null>(null)

	// Состояние архива
	const [archiveId, setArchiveId] = useState<string | null>(null)
	const [archiveReason, setArchiveReason] = useState('')

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		})
	}

	const handleEditClick = (client: Client) => {
		setEditingClient(client)
		setIsEditOpen(true)
	}

	const handleDeleteClick = (id: string) => {
		setDeleteId(id)
	}

	const confirmDelete = () => {
		if (deleteId) {
			deleteClient(deleteId)
			toast('Клиент удален', {
				description: 'Запись была успешно удалена из таблицы.',
			})
			setDeleteId(null)
		}
	}

	const handleArchiveClick = (id: string) => {
		setArchiveId(id)
		setArchiveReason('')
	}

	const confirmArchive = () => {
		if (archiveId) {
			moveToArchive(archiveId, archiveReason || 'Нет причины')
			toast('Клиент в архиве', {
				description: 'Клиент был перемещен в архив.',
			})
			setArchiveId(null)
			setArchiveReason('')
		}
	}

	const handleRestoreClick = (id: string) => {
		restoreFromArchive(id)
		toast('Клиент восстановлен', {
			description: 'Клиент был восстановлен из архива.',
		})
	}

	const handleViewHistory = (clientId: string) => {
		navigate(`${UrlNames.ACTIVITY_LOGS}?entity=${clientId}`)
	}

	const content = (
		<div className='overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='text-slate-400 h-12'>
						<TableHead className='text-slate-600'>Клиент</TableHead>
						<TableHead className='text-slate-600'>Телефон</TableHead>
						<TableHead className='text-slate-600'>Менеджер</TableHead>
						<TableHead className='text-slate-600'>Статус</TableHead>
						<TableHead className='text-slate-600'>Последний контакт</TableHead>
						<TableHead className='text-slate-600 text-right'>
							Действия
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredClients.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={6}
								className='h-24 text-center text-slate-500'
							>
								Данных не найдено
							</TableCell>
						</TableRow>
					) : (
						filteredClients.map(client => (
							<TableRow
								key={client.id}
								className={`transition-colors hover:bg-muted/50 h-16 ${
									client.status === 'archived' ? 'bg-slate-50/50' : ''
								}`}
							>
								<TableCell>
									<div className='flex flex-col'>
										<span className='font-medium text-slate-900'>
											{client.name}
										</span>
										<span className='text-xs text-slate-500 hidden sm:inline-block'>
											{client.email}
										</span>
									</div>
								</TableCell>

								<TableCell>
									<span className='text-sm text-slate-600'>{client.phone}</span>
								</TableCell>

								<TableCell>
									{client.managerName ? (
										<div className='flex items-center gap-2'>
											<div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary'>
												{client.managerName.slice(0, 2)}
											</div>
											<span className='text-sm text-slate-700'>
												{client.managerName}
											</span>
										</div>
									) : (
										<span className='text-sm text-slate-400'>Не назначен</span>
									)}
								</TableCell>

								<TableCell>
									<Badge
										variant='secondary'
										className={clientStatusConfig[client.status].className}
									>
										{clientStatusConfig[client.status].label}
									</Badge>
								</TableCell>

								<TableCell className='text-slate-600'>
									{formatDate(client.lastContactAt)}
								</TableCell>

								<TableCell className='text-right'>
									<div className='flex items-center justify-end gap-1'>
										{/* История */}
										<Button
											variant='ghost'
											size='icon-sm'
											onClick={() => handleViewHistory(client.id)}
											title='История действий'
											className='text-slate-400 hover:text-blue-600'
										>
											<Eye className='h-4 w-4' />
										</Button>

										{client.status === 'archived' ? (
											/* Восстановить из архива */
											<Button
												variant='ghost'
												size='icon-sm'
												onClick={() => handleRestoreClick(client.id)}
												title='Восстановить'
												className='text-slate-400 hover:text-green-600'
											>
												<ArchiveRestore className='h-4 w-4' />
											</Button>
										) : (
											<>
												{/* Редактировать */}
												<Button
													variant='ghost'
													size='icon-sm'
													onClick={() => handleEditClick(client)}
													title='Редактировать'
													className='text-slate-400 hover:text-blue-600'
												>
													<Pencil className='h-4 w-4' />
												</Button>

												{/* В архив */}
												<Button
													variant='ghost'
													size='icon-sm'
													onClick={() => handleArchiveClick(client.id)}
													title='В архив'
													className='text-slate-400 hover:text-orange-600'
												>
													<Archive className='h-4 w-4' />
												</Button>

												{/* Удалить */}
												<Button
													variant='ghost'
													size='icon-sm'
													onClick={() => handleDeleteClick(client.id)}
													title='Удалить'
													className='text-slate-400 hover:text-red-600'
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											</>
										)}
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{filteredClients.length > 0 && <ClientsPagination />}

			{/* Диалог редактирования */}
			<ClientsEdit
				client={editingClient}
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
			/>

			{/* Диалог удаления */}
			<AlertDialog
				open={!!deleteId}
				onOpenChange={open => !open && setDeleteId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Удалить клиента?</AlertDialogTitle>
						<AlertDialogDescription>
							Это действие нельзя отменить. Клиент будет полностью удален из
							системы.
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

			{/* Диалог перемещения в архив */}
			<AlertDialog
				open={!!archiveId}
				onOpenChange={open => !open && setArchiveId(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Переместить в архив?</AlertDialogTitle>
						<AlertDialogDescription>
							Клиент будет перемещен в архив. Вы сможете восстановить его позже.
							<div className='mt-3'>
								<label className='text-sm font-medium text-slate-700'>
									Причина (опционально):
								</label>
								<textarea
									value={archiveReason}
									onChange={e => setArchiveReason(e.target.value)}
									placeholder='Например: Нет активности более 30 дней'
									className='mt-1 w-full rounded-md border border-slate-300 p-2 text-sm resize-none'
									rows={2}
								/>
							</div>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Отмена</AlertDialogCancel>
						<AlertDialogAction onClick={confirmArchive}>
							В архив
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)

	return content
}

export default ClientsTable
