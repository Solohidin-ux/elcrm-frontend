import { Clock, History } from 'lucide-react'
import { Label } from '@/components/ui/label'
import type { ActionLog } from '@/shared/utils/moc-data'

interface TaskActionLogsProps {
	logs: ActionLog[]
}

export default function TaskActionLogs({ logs }: TaskActionLogsProps) {
	return (
		<div className='space-y-3'>
			<Label className='flex items-center gap-2 text-sm font-semibold'>
				<History className='h-4 w-4' />
				История действий ({logs.length})
			</Label>

			{logs.length === 0 ? (
				<p className='text-xs text-muted-foreground text-center py-4'>
					Нет записей
				</p>
			) : (
				<div className='space-y-2 max-h-64 overflow-y-auto shadcn-scrollbar'>
					{logs
						.slice()
						.reverse()
						.map(log => (
							<div
								key={log.id}
								className='p-2.5 rounded-lg border bg-muted/30 border-border text-xs'
							>
								<div className='flex items-start justify-between gap-2'>
									<div className='flex-1 min-w-0'>
										<p className='font-medium text-slate-900'>
											{log.action}
										</p>
										{log.details && (
											<p className='text-[10px] text-muted-foreground mt-0.5'>
												{log.details}
											</p>
										)}
									</div>
									<div className='text-right shrink-0'>
										<p className='text-[10px] font-medium'>{log.userName}</p>
										<div className='flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5'>
											<Clock className='h-3 w-3' />
											{new Date(log.timestamp).toLocaleDateString('ru-RU', {
												day: 'numeric',
												month: 'short',
												hour: '2-digit',
												minute: '2-digit',
											})}
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	)
}
