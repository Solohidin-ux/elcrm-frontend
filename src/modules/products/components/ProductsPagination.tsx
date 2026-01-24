import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import React, { useState } from 'react'

function ProductsPagination() {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = 4

	const handlePageChange = (e: React.MouseEvent, page: number): void => {
		e.preventDefault()

		if (page < 1 || page > totalPages) return

		setCurrentPage(page)

		console.log(`Переход на страницу: ${page}`)
	}

	const baseBtnClass =
		'h-8 w-8 rounded-lg border-none bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center p-0 text-center cursor-pointer transition-colors'

	const activeBtnClass =
		'h-8 w-8 rounded-lg border-none bg-slate-900 text-white hover:bg-slate-800 hover:text-white flex items-center justify-center cursor-default'

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	const content = (
		<div className='py-3 border-t border-slate-200'>
			<Pagination>
				<PaginationContent className='gap-3'>
					<PaginationItem>
						<PaginationPrevious
							href='#'
							className={`${baseBtnClass} ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
							onClick={e => handlePageChange(e, currentPage - 1)}
						/>
					</PaginationItem>

					{pages.map(page => (
						<PaginationItem key={page}>
							<PaginationLink
								href='#'
								isActive={currentPage === page}
								className={currentPage === page ? activeBtnClass : baseBtnClass}
								onClick={e => handlePageChange(e, page)}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							href='#'
							className={`${baseBtnClass} ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
							onClick={e => handlePageChange(e, currentPage + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)

	return content
}

export default ProductsPagination
