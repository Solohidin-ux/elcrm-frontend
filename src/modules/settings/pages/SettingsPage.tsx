import { cn } from '@/lib/utils'
import {
	type ThemeColor,
	useThemeColor,
} from '@/shared/utils/use-theme-color.tsx'
import { Check } from 'lucide-react'

// UI Компоненты
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Layout from '@/shared/components/Layout'

const availableColors: { name: string; value: ThemeColor; cssClass: string }[] =
	[
		{
			name: 'Базовый',
			value: 'default',
			cssClass: 'bg-foreground',
		},
		{
			name: 'Синий',
			value: 'blue',
			cssClass: 'bg-[#0F3BBF]',
		},
		{
			name: 'Розовый',
			value: 'rose',
			cssClass: 'bg-[#FF2667]',
		},
	]

export default function SettingsPage() {
	const { themeColor, setThemeColor } = useThemeColor()

	return (
		<Layout>
			<div className='container max-w-4xl mx-auto py-10 space-y-8'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Настройки</h1>
					<p className='text-muted-foreground mt-2'>
						Управление внешним видом и цветовой схемой приложения.
					</p>
				</div>

				<div className='grid gap-8 md:grid-cols-[1fr_300px]'>
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Цветовая схема</CardTitle>
								<CardDescription>
									Выберите основной цвет для компонентов интерфейса.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
									{availableColors.map(color => {
										const isActive = themeColor === color.value
										return (
											<Button
												key={color.value}
												variant='outline'
												className={cn(
													'h-auto py-4 flex flex-col gap-3 relative hover:bg-accent/50 transition-all',
													isActive
														? 'border-primary bg-accent/20 ring-1 ring-primary'
														: 'border-border',
												)}
												onClick={() => setThemeColor(color.value)}
											>
												<span
													className={cn(
														'h-10 w-10 rounded-full shadow-sm flex items-center justify-center transition-transform',
														color.cssClass,
														isActive ? 'scale-110' : '',
													)}
												>
													{isActive && (
														<Check className='h-5 w-5 text-white ' />
													)}
												</span>
												<span className='font-medium text-sm'>
													{color.name}
												</span>
											</Button>
										)
									})}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Предпросмотр компонентов</CardTitle>
								<CardDescription>
									Посмотрите, как выбранный цвет выглядит на реальных элементах.
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email адрес</Label>
									<Input id='email' placeholder='example@mail.com' />
									<p className='text-[0.8rem] text-muted-foreground'>
										Фокус на инпуте использует цвет Ring.
									</p>
								</div>

								<div className='flex flex-wrap gap-4 items-center pt-4'>
									<Button>Основная кнопка</Button>
									<Button variant='secondary'>Вторичная</Button>
									<Button variant='destructive'>Удалить</Button>
									<Button variant='outline'>Контур</Button>
								</div>

								<div className='flex gap-2 pt-4'>
									<Badge>Badge</Badge>
									<Badge variant='secondary'>Secondary</Badge>
									<Badge variant='outline'>Outline</Badge>
								</div>
							</CardContent>
							<CardFooter className='bg-muted/50 border-t p-4 flex justify-between items-center rounded-b-lg'>
								<span className='text-sm text-muted-foreground'>
									Пример футера
								</span>
								<Button size='sm'>Сохранить</Button>
							</CardFooter>
						</Card>
					</div>

					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Уведомления</CardTitle>
								<CardDescription>Пример переключателей</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-6'>
								<div className='flex items-center justify-between space-x-2'>
									<Label
										htmlFor='marketing'
										className='flex flex-col space-y-1'
									>
										<span>Маркетинг</span>
										<span className='font-normal leading-snug text-muted-foreground text-xs'>
											Получать новости о продуктах.
										</span>
									</Label>
									<Switch id='marketing' defaultChecked />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</Layout>
	)
}
