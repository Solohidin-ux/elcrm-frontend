import { formatMoney } from '../utils/utils'

interface StatCardProps {
	title: string
	amount: number
	growth: string
	label: string
}

function FinancesStatCard({ title, amount, growth, label }: StatCardProps) {
	const content = (
		<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between'>
			<div>
				<h3 className='text-gray-500 text-sm font-medium uppercase tracking-wider'>
					{title}
				</h3>
				<div className='mt-2 flex items-baseline gap-2'>
					<span className='text-3xl font-bold text-gray-900'>
						{formatMoney(amount)}
					</span>
					<span className='text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full'>
						{growth}
					</span>
				</div>
			</div>
			<p className='mt-4 text-xs text-gray-400'>{label}</p>
		</div>
	)

	return content
}

export default FinancesStatCard
