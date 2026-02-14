import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import React from 'react'

interface ActionBtnProps extends React.HTMLAttributes<HTMLDivElement> {
	icon: React.ElementType
	hasBadge?: boolean
	badgeCount?: number
}

export const ActionBtn = React.forwardRef<HTMLDivElement, ActionBtnProps>(
	({ icon: Icon, hasBadge, badgeCount, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={`relative inline-flex cursor-pointer group ${className}`}
				{...props}
			>
				<Button
					variant='ghost'
					size='icon'
					className='h-10 w-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:text-primary transition-colors pointer-events-none'
				>
					<Icon size={20} strokeWidth={2} />
				</Button>
				{hasBadge && badgeCount !== undefined && badgeCount > 0 && (
					<Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground border-2 border-background pointer-events-none'>
						{badgeCount > 99 ? '99+' : badgeCount}
					</Badge>
				)}
			</div>
		)
	},
)
ActionBtn.displayName = 'ActionBtn'
