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
import { useLogin } from '@/shared/hooks/useClients'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email('Неверный email'),
	password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
})

type FormData = z.infer<typeof schema>

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	})

	const { mutate: login } = useLogin()

	const onSubmit = (data: FormData) => {
		console.log(data)
		login(data)
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<Card className='w-full max-w-sm'>
				<CardHeader className='flex flex-col'>
					<CardTitle className='text-xl'>Вход в аккаунт</CardTitle>
					<CardDescription>
						Введите ваш email для входа в аккаунт
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@primer.kg'
									{...register('email')}
								/>
								{errors.email && (
									<p className='text-sm text-red-500'>{errors.email.message}</p>
								)}
							</div>

							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Пароль</Label>
									<a
										href='#'
										className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
									>
										Забыли пароль?
									</a>
								</div>
								<Input
									id='password'
									type='password'
									{...register('password')}
								/>
								{errors.password && (
									<p className='text-sm text-red-500'>
										{errors.password.message}
									</p>
								)}
							</div>
						</div>
					</CardContent>

					<CardFooter className='flex-col gap-2 mt-6'>
						<Button type='submit' className='w-full'>
							Войти
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}

export default LoginPage
