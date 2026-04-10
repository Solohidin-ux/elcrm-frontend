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

// Конфигурация модулей (только цвета, метки берутся из i18n)
export const activityLogModuleConfig: Record<
	ActivityLogModule,
	{ color: string }
> = {
	clients: { color: 'bg-blue-100 text-blue-700' },
	deals: { color: 'bg-green-100 text-green-700' },
	products: { color: 'bg-purple-100 text-purple-700' },
	finances: { color: 'bg-yellow-100 text-yellow-700' },
	system: { color: 'bg-slate-100 text-slate-700' },
}
