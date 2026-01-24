import type { IProduct } from '@/shared/utils/moc-data'

interface TopProductsTableProps {
	products: IProduct[]
}

function FinancesTopProductsTable({ products }: TopProductsTableProps) {
	const content = (
		<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden col-span-1 lg:col-span-3'>
			<div className='p-6 border-b border-gray-100'>
				<h3 className='text-lg font-bold text-gray-900'>
					Топ товаров по конверсии
				</h3>
			</div>
			<div className='overflow-x-auto'>
				<table className='w-full text-left'>
					<thead className='bg-gray-50 text-gray-500 text-xs uppercase'>
						<tr>
							<th className='px-6 py-3 font-medium'>Название товара</th>
							<th className='px-6 py-3 font-medium text-center'>Продаж (шт)</th>
							<th className='px-6 py-3 font-medium text-right'>Конверсия</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100'>
						{products.map(product => (
							<tr
								key={product.id}
								className='hover:bg-gray-50 transition-colors'
							>
								<td className='px-6 py-4 font-medium text-gray-900'>
									{product.name}
								</td>
								<td className='px-6 py-4 text-center text-gray-600'>
									{product.sales}
								</td>
								<td className='px-6 py-4 text-right'>
									<div className='flex items-center justify-end gap-2'>
										<div className='w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden'>
											<div
												className='bg-indigo-500 h-1.5 rounded-full'
												style={{
													width: `${Math.min(product.conversion * 3, 100)}%`,
												}}
											></div>
										</div>
										<span className='font-bold text-gray-900'>
											{product.conversion}%
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)

	return content
}

export default FinancesTopProductsTable
