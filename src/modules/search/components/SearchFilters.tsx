import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Filter } from 'lucide-react'

interface FiltersProps {
	selectedTypes: string[]
	onTypeChange: (type: string) => void
	totalCounts: Record<string, number>
}

function SearchFilters({
	selectedTypes,
	onTypeChange,
	totalCounts,
}: FiltersProps) {
	const content = (
		<div className='w-full lg:w-64 flex-shrink-0 space-y-6'>
			<div className='flex items-center gap-2 pb-4 border-b border-border'>
				<Filter className='h-4 w-4 text-muted-foreground' />
				<h3 className='font-semibold text-lg'>Фильтры</h3>
			</div>

			<Accordion type='multiple' defaultValue={['type', 'date', 'status']}>
				{/* 1. Тип сущности */}
				<AccordionItem value='type' className='border-none'>
					<AccordionTrigger className='hover:no-underline py-2'>
						<span className='font-medium'>Тип данных</span>
					</AccordionTrigger>
					<AccordionContent>
						<div className='space-y-3 pt-1'>
							{[
								{ id: 'client', label: 'Клиенты' },
								{ id: 'order', label: 'Заказы' },
								{ id: 'product', label: 'Товары' },
								{ id: 'payment', label: 'Платежи' },
							].map(type => (
								<div key={type.id} className='flex items-center space-x-2'>
									<Checkbox
										id={type.id}
										checked={selectedTypes.includes(type.id)}
										onCheckedChange={() => onTypeChange(type.id)}
									/>
									<Label
										htmlFor={type.id}
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 flex justify-between'
									>
										<span>{type.label}</span>
										<span className='text-muted-foreground text-xs'>
											({totalCounts[type.id] || 0})
										</span>
									</Label>
								</div>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* 2. Дата */}
				<AccordionItem value='date' className='border-none mt-4'>
					<AccordionTrigger className='hover:no-underline py-2'>
						<span className='font-medium'>Дата создания</span>
					</AccordionTrigger>
					<AccordionContent>
						<div className='grid grid-cols-2 gap-2 pt-1'>
							<div className='space-y-1'>
								<Label className='text-xs text-muted-foreground'>От</Label>
								<div className='relative'>
									<Input type='date' className='h-9 text-xs' />
								</div>
							</div>
							<div className='space-y-1'>
								<Label className='text-xs text-muted-foreground'>До</Label>
								<div className='relative'>
									<Input type='date' className='h-9 text-xs' />
								</div>
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				{/* 3. Статус */}
				<AccordionItem value='status' className='border-none mt-4'>
					<AccordionTrigger className='hover:no-underline py-2'>
						<span className='font-medium'>Статус</span>
					</AccordionTrigger>
					<AccordionContent>
						<div className='space-y-3 pt-1'>
							{['Активные', 'Завершённые', 'Отменённые', 'VIP'].map(
								(status, i) => (
									<div key={i} className='flex items-center space-x-2'>
										<Checkbox id={`status-${i}`} />
										<Label
											htmlFor={`status-${i}`}
											className='text-sm font-medium'
										>
											{status}
										</Label>
									</div>
								),
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			<div className='pt-4 border-t border-border'>
				<Button variant='outline' className='w-full'>
					Сбросить фильтры
				</Button>
			</div>
		</div>
	)

	return content
}

export default SearchFilters
