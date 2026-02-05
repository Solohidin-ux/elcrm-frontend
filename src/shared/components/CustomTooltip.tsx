import React from 'react'

interface CustomTooltipProps {
	children: React.ReactNode
	content: string
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
	children,
	content,
}) => {
	return (
		<div className='relative group flex items-center justify-center'>
			{children}
			<div
				className='absolute left-full ml-4 px-3 py-1.5 
                    bg-primary text-white text-xs font-medium rounded-md 
                    whitespace-nowrap opacity-0 group-hover:opacity-100 
                    transition-all duration-200 pointer-events-none 
                    translate-x-[-10px] group-hover:translate-x-0 z-[100] shadow-lg'
			>
				<div
					className='absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                        border-4 border-transparent border-r-primary'
				/>
				{content}
			</div>
		</div>
	)
}
