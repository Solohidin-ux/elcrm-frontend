import React from 'react'

export const DashboardCard = ({
	children,
	className = '',
}: {
	children: React.ReactNode
	className?: string
}) => (
	<div
		className={`bg-card text-card-foreground rounded-xl border shadow-sm ${className}`}
	>
		{children}
	</div>
)

export const StatusBadge = ({
	children,
	variant = 'default',
}: {
	children: React.ReactNode
	variant?: 'default' | 'destructive' | 'success' | 'outline'
}) => {
	const styles = {
		default: 'bg-primary/10 text-primary border-primary/20',
		destructive: 'bg-destructive/10 text-destructive border-destructive/20',
		success: 'bg-green-100 text-green-700 border-green-200',
		outline: 'border border-input bg-background',
	}
	return (
		<span
			className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
		>
			{children}
		</span>
	)
}

export const SimpleProgress = ({
	value,
	max,
	className = 'bg-primary',
}: {
	value: number
	max: number
	className?: string
}) => {
	const percent = Math.min(100, Math.max(0, (value / max) * 100))
	return (
		<div className='h-2 w-full bg-secondary rounded-full overflow-hidden'>
			<div className={`h-full ${className}`} style={{ width: `${percent}%` }} />
		</div>
	)
}
