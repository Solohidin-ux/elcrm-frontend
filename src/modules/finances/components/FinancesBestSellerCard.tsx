import type { ISeller } from '@/shared/utils/moc-data'
import { formatMoney } from '../utils/utils'

interface BestSellerCardProps {
	seller: ISeller
}

function FinancesBestSellerCard({ seller }: BestSellerCardProps) {
	const content = (
		<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
			<h3 className='text-gray-900 text-lg font-bold mb-4 flex items-center gap-2'>
				🏆 Лучший сотрудник
			</h3>
			<div className='flex items-center gap-4'>
				<div
					className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${seller.avatarColor}`}
				>
					{seller.name.charAt(0)}
				</div>
				<div>
					<p className='text-xl font-semibold text-gray-800'>{seller.name}</p>
					<p className='text-sm text-gray-500'>{seller.position}</p>
				</div>
			</div>
			<div className='mt-6 grid grid-cols-2 gap-4 border-t pt-4'>
				<div>
					<p className='text-xs text-gray-400'>Сумма продаж</p>
					<p className='text-lg font-bold text-gray-900'>
						{formatMoney(seller.totalSales)}
					</p>
				</div>
				<div>
					<p className='text-xs text-gray-400'>Закрытых сделок</p>
					<p className='text-lg font-bold text-gray-900'>{seller.deals}</p>
				</div>
			</div>
		</div>
	)

	return content
}

export default FinancesBestSellerCard
