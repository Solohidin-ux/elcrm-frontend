import Layout from '@/shared/components/Layout'
import {
	best_seller,
	finance_analytics,
	top_products,
} from '@/shared/utils/moc-data'
import FinancesBestSellerCard from '../components/FinancesBestSellerCard'
import FinancesStatCard from '../components/FinancesStatCard'
import FinancesTopProductsTable from '../components/FinancesTopProductsTable'

function FinancesPage() {
	const content = (
		<Layout>
			<div className='p-6 space-y-6'>
				<div className='mb-6'>
					<h1 className='text-2xl font-bold text-gray-800'>
						Финансовая аналитика
					</h1>
					<p className='text-gray-500'>
						Обзор ключевых показателей эффективности за текущий период
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<FinancesStatCard
						title='Продажи за сегодня'
						amount={finance_analytics.today}
						growth={finance_analytics.growthDay}
						label='По сравнению со вчерашним днём'
					/>

					<FinancesStatCard
						title='Выручка за месяц'
						amount={finance_analytics.month}
						growth={finance_analytics.growthMonth}
						label='По сравнению с прошлым месяцем'
					/>

					<div className='md:col-span-2 lg:col-span-1'>
						<FinancesBestSellerCard seller={best_seller} />
					</div>

					<div className='col-span-1 md:col-span-2 lg:col-span-3'>
						<FinancesTopProductsTable products={top_products} />
					</div>
				</div>
			</div>
		</Layout>
	)

	return content
}

export default FinancesPage
