export const en = {
	// Sidebar
	sidebar: {
		dashboard: 'Dashboard',
		overview: 'Overview',
		managers: 'Managers',
		finance: 'Finance',
		sales: 'Sales',
		clients: 'Clients',
		products: 'Products',
		funnel: 'Sales Funnel',
		activityLogs: 'Activity Logs',
		archive: 'Archive',
	},

	// Kanban
	kanban: {
		addTask: 'Add Task',

		columns: {
			new: 'New',
			contacted: 'Contacted',
			agreed: 'Agreed',
			bought: 'Bought',
			refused: 'Refused',
		},

		toasts: {
			updatedStatus: 'Status Updated',
			taskMoved:
				'Task "{{taskTitle}}" was moved from "{{initialStatusTitle}}" to "{{currentStatusTitle}}"',
		},
	},

	// Clients
	clients: {
		title: 'Clients List',
		searchPlaceholder: 'Search client...',
		addClient: 'Add Client',
		editClient: 'Edit Client',
		newClient: 'New Client',
		deleteClient: 'Delete Client?',
		deleteConfirm:
			'This action cannot be undone. The client will be permanently deleted.',
		archiveClient: 'Move to Archive?',
		archiveConfirm:
			'The client will be moved to archive. You can restore them later.',
		archiveReason: 'Reason (optional):',
		archiveReasonPlaceholder: 'For example: No activity for more than 30 days',
		clientDeleted: 'Client deleted',
		clientArchived: 'Client archived',
		clientRestored: 'Client restored',
		clientAdded: 'Client added',
		clientUpdated: 'Client updated',
		viewHistory: 'Activity History',
		edit: 'Edit',
		delete: 'Delete',
		toArchive: 'Archive',
		restore: 'Restore',
		noData: 'No data found',

		// Table headers
		table: {
			client: 'Client',
			phone: 'Phone',
			manager: 'Manager',
			status: 'Status',
			lastContact: 'Last Contact',
			actions: 'Actions',
		},

		// Form fields
		form: {
			name: 'Full Name',
			namePlaceholder: 'John Doe',
			email: 'Email',
			emailPlaceholder: 'mail@example.com',
			phone: 'Phone',
			phonePlaceholder: '+1 (999)...',
			source: 'Source',
			manager: 'Assigned Manager',
			selectManager: 'Select manager',
			noManager: 'Not assigned',
			save: 'Save',
			cancel: 'Cancel',
			saveChanges: 'Save Changes',
		},

		// Statuses
		statuses: {
			active: 'Active',
			pending: 'Pending',
			in_progress: 'In Progress',
			archived: 'Archived',
			all: 'All Statuses',
		},

		// Sources
		sources: {
			Google: 'Google',
			Yandex: 'Yandex',
			WhatsApp: 'WhatsApp',
			'Social Media': 'Social Media',
			'Walk-in': 'Walk-in',
			Referral: 'Referral',
			Email: 'Email',
			all: 'All Sources',
		},

		// Filters
		filters: {
			withoutArchive: 'Without Archive',
			withArchive: 'With Archive',
		},
	},

	// Activity Logs
	activityLogs: {
		title: 'Activity Logs',
		description: 'All system activities: creation, changes, calls, messages',
		totalRecords: 'Total records',
		searchPlaceholder: 'Search activities...',
		noData: 'No records',
		noDataHint: 'Try changing filter parameters',
		allModules: 'All Modules',
		allTypes: 'All Types',
		clearFilters: 'Clear',
		entity: 'Entity',

		// Modules
		modules: {
			clients: 'Clients',
			deals: 'Deals',
			products: 'Products',
			finances: 'Finances',
			system: 'System',
		},

		// Action types
		types: {
			client_created: 'Client created',
			client_updated: 'Client updated',
			client_deleted: 'Client deleted',
			client_archived: 'Client archived',
			client_restored: 'Client restored',
			client_status_changed: 'Client status changed',
			client_manager_assigned: 'Manager assigned',
			deal_created: 'Deal created',
			deal_status_changed: 'Deal status changed',
			deal_product_added: 'Product added',
			deal_reminder_set: 'Reminder set',
			deal_refused: 'Deal refused',
			deal_sold: 'Deal closed',
			call_made: 'Call made',
			message_sent: 'Message sent',
			note_added: 'Note added',
			reminder_added: 'Reminder',
			custom: 'Action',
		},
	},

	// Common
	common: {
		cancel: 'Cancel',
		save: 'Save',
		delete: 'Delete',
		edit: 'Edit',
		add: 'Add',
		search: 'Search',
		filter: 'Filter',
		from: 'From',
		to: 'To',
	},
}
