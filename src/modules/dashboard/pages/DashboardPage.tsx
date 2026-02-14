import Layout from '@/shared/components/Layout'
import { useState } from 'react'
import DashboardManagerPage from './DashboardManagerPage'
import DashboardOwnerPage from './DashboardOwnerPage'

export default function DashboardPage() {
	const [role, setRole] = useState<'owner' | 'manager'>('manager')

	return (
		<Layout className='p-4'>
			{role === 'owner' ? <DashboardOwnerPage /> : <DashboardManagerPage />}
		</Layout>
	)
}
