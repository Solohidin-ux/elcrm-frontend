import {
	Bell,
	CheckCircle,
	MessageSquare,
	Phone,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/shared/store/auth-store'
import type { ColumnType, Task } from '@/shared/utils/moc-data'

interface TaskQuickActionsProps {
	task: Task
	onCall: () => void
	onMessage: () => void
	onAddReminder: () => void
	onMoveToStatus: (status: ColumnType) => void
	onRefuse: (comment: string) => void
	onSetStatusFlag: (flag: Task['statusFlags']) => void
}

export default function TaskQuickActions({
	task,
	onCall,
	onMessage,
	onAddReminder,
	onMoveToStatus,
	onRefuse,
	onSetStatusFlag,
}: TaskQuickActionsProps) {
	const { user } = useAuthStore()
	const [showRefuseDialog, setShowRefuseDialog] = useState(false)
	const [refuseComment, setRefuseComment] = useState('')
	const [showFlagDialog, setShowFlagDialog] = useState(false)
	const [flagType, setFlagType] = useState<
		'client_ignoring' | 'client_postponed' | 'client_blocked' | 'none'
	>('none')
	const [flagReason, setFlagReason] = useState('')

	const handleRefuse = () => {
		if (!refuseComment.trim()) return
		onRefuse(refuseComment.trim())
		setRefuseComment('')
		setShowRefuseDialog(false)
	}

	const handleSetFlag = () => {
		onSetStatusFlag({
			type: flagType,
			reason: flagReason.trim() || undefined,
			setAt: new Date().toISOString(),
			setBy: user?.name ?? 'Неизвестный пользователь',
		})
		setFlagType('none')
		setFlagReason('')
		setShowFlagDialog(false)
	}

	const isRefused = task.status === 'refused' && task.refusalComment

	return (
		<div className='space-y-2'>
			<div className='flex flex-wrap gap-2'>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5'
					onClick={onCall}
				>
					<Phone className='h-3.5 w-3.5' />
					Позвонить
				</Button>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5'
					onClick={onMessage}
				>
					<MessageSquare className='h-3.5 w-3.5' />
					Написать
				</Button>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5'
					onClick={onAddReminder}
				>
					<Bell className='h-3.5 w-3.5' />
					Напоминание
				</Button>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
					onClick={() => onMoveToStatus('bought')}
				>
					<CheckCircle className='h-3.5 w-3.5' />
					Купил
				</Button>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
					onClick={() => setShowRefuseDialog(true)}
				>
					<XCircle className='h-3.5 w-3.5' />
					Отказ
				</Button>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-8 text-xs gap-1.5'
					onClick={() => setShowFlagDialog(true)}
				>
					Флажок статуса
				</Button>
			</div>

			{/* Флажок статуса */}
			{task.statusFlags && task.statusFlags.type !== 'none' && (
				<div className='p-2 rounded-lg bg-orange-50 border border-orange-200'>
					<p className='text-xs font-medium text-orange-900'>
						{task.statusFlags.type === 'client_ignoring'
							? 'Клиент игнорирует'
							: task.statusFlags.type === 'client_postponed'
								? 'Клиент отложил решение'
								: 'Клиент заблокировал контакт'}
					</p>
					{task.statusFlags.reason && (
						<p className='text-[10px] text-orange-700 mt-1'>
							{task.statusFlags.reason}
						</p>
					)}
				</div>
			)}

			{/* Комментарий при отказе */}
			{isRefused && task.refusalComment && (
				<div className='p-2 rounded-lg bg-red-50 border border-red-200'>
					<p className='text-xs font-medium text-red-900 mb-1'>
						Причина отказа:
					</p>
					<p className='text-xs text-red-700'>{task.refusalComment}</p>
				</div>
			)}

			{/* Диалог отказа */}
			<Dialog open={showRefuseDialog} onOpenChange={setShowRefuseDialog}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Перевести в отказ</DialogTitle>
						<DialogDescription>
							Укажите причину отказа. Это обязательно для анализа причин потерь.
						</DialogDescription>
					</DialogHeader>
					<div className='space-y-4 py-4'>
						<Label htmlFor='refuse-comment'>Комментарий *</Label>
						<textarea
							id='refuse-comment'
							placeholder='Укажите причину отказа...'
							value={refuseComment}
							onChange={e => setRefuseComment(e.target.value)}
							className='flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
						/>
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => {
								setShowRefuseDialog(false)
								setRefuseComment('')
							}}
						>
							Отмена
						</Button>
						<Button
							type='button'
							onClick={handleRefuse}
							disabled={!refuseComment.trim()}
							className='bg-red-600 hover:bg-red-700'
						>
							Перевести в отказ
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Диалог флажка статуса */}
			<Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Установить флажок статуса</DialogTitle>
						<DialogDescription>
							Защита менеджера: укажите, если сделка остановилась не по вашей
							вине.
						</DialogDescription>
					</DialogHeader>
					<div className='space-y-4 py-4'>
						<div>
							<Label htmlFor='flag-type'>Тип флажка</Label>
							<Select
								value={flagType}
								onValueChange={v =>
									setFlagType(
										v as
											| 'client_ignoring'
											| 'client_postponed'
											| 'client_blocked'
											| 'none',
									)
								}
							>
								<SelectTrigger id='flag-type'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='none'>Нет флажка</SelectItem>
									<SelectItem value='client_ignoring'>
										Клиент игнорирует
									</SelectItem>
									<SelectItem value='client_postponed'>
										Клиент отложил решение
									</SelectItem>
									<SelectItem value='client_blocked'>
										Клиент заблокировал контакт
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{flagType !== 'none' && (
							<div>
								<Label htmlFor='flag-reason'>Причина (опционально)</Label>
								<Input
									id='flag-reason'
									placeholder='Дополнительная информация...'
									value={flagReason}
									onChange={e => setFlagReason(e.target.value)}
								/>
							</div>
						)}
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => {
								setShowFlagDialog(false)
								setFlagType('none')
								setFlagReason('')
							}}
						>
							Отмена
						</Button>
						<Button type='button' onClick={handleSetFlag}>
							Сохранить
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
