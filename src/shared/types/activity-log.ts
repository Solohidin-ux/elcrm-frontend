// Типы для системы логирования действий

export type ActivityLogType =
	| 'client_created'
	| 'client_updated'
	| 'client_deleted'
	| 'client_archived'
	| 'client_restored'
	| 'client_status_changed'
	| 'client_manager_assigned'
	| 'deal_created'
	| 'deal_status_changed'
	| 'deal_product_added'
	| 'deal_reminder_set'
	| 'deal_refused'
	| 'deal_sold'
	| 'call_made'
	| 'message_sent'
	| 'note_added'
	| 'reminder_added'
	| 'custom'

export type ActivityLogModule =
	| 'clients'
	| 'deals'
	| 'products'
	| 'finances'
	| 'system'

export interface ActivityLog {
	id: string
	type: ActivityLogType
	module: ActivityLogModule
	action: string
	description?: string
	userId: string
	userName: string
	timestamp: string
	entityId?: string
	entityName?: string
	metadata?: Record<string, unknown>
}

// Конфигурация типов логов
export const activityLogTypeConfig: Record<
	ActivityLogType,
	{ label: string; icon: string }
> = {
	client_created: { label: 'Клиент создан', icon: 'UserPlus' },
	client_updated: { label: 'Клиент обновлен', icon: 'UserCog' },
	client_deleted: { label: 'Клиент удален', icon: 'UserMinus' },
	client_archived: { label: 'Клиент в архиве', icon: 'Archive' },
	client_restored: { label: 'Клиент восстановлен', icon: 'ArchiveRestore' },
	client_status_changed: { label: 'Статус клиента изменен', icon: 'RefreshCw' },
	client_manager_assigned: { label: 'Менеджер назначен', icon: 'UserCheck' },
	deal_created: { label: 'Сделка создана', icon: 'Plus' },
	deal_status_changed: { label: 'Статус сделки изменен', icon: 'ArrowRight' },
	deal_product_added: { label: 'Товар добавлен', icon: 'Package' },
	deal_reminder_set: { label: 'Напоминание установлено', icon: 'Bell' },
	deal_refused: { label: 'Сделка в отказе', icon: 'X' },
	deal_sold: { label: 'Сделка закрыта', icon: 'Check' },
	call_made: { label: 'Звонок', icon: 'Phone' },
	message_sent: { label: 'Сообщение', icon: 'MessageCircle' },
	note_added: { label: 'Заметка добавлена', icon: 'FileText' },
	reminder_added: { label: 'Напоминание', icon: 'Bell' },
	custom: { label: 'Действие', icon: 'Activity' },
}

// Конфигурация модулей
export const activityLogModuleConfig: Record<
	ActivityLogModule,
	{ label: string; color: string }
> = {
	clients: { label: 'Клиенты', color: 'bg-blue-100 text-blue-700' },
	deals: { label: 'Сделки', color: 'bg-green-100 text-green-700' },
	products: { label: 'Товары', color: 'bg-purple-100 text-purple-700' },
	finances: { label: 'Финансы', color: 'bg-yellow-100 text-yellow-700' },
	system: { label: 'Система', color: 'bg-slate-100 text-slate-700' },
}
