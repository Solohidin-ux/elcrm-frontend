import { MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { InternalMessage } from '@/shared/utils/moc-data'

interface TaskInternalChatProps {
	messages: InternalMessage[]
	onSendMessage: (text: string) => void
	currentUser?: string
	currentUserName?: string
}

export default function TaskInternalChat({
	messages,
	onSendMessage,
}: TaskInternalChatProps) {
	const [messageText, setMessageText] = useState('')

	const handleSend = () => {
		const text = messageText.trim()
		if (!text) return

		onSendMessage(text)
		setMessageText('')
	}

	return (
		<div className='space-y-3'>
			<Label className='flex items-center gap-2 text-sm font-semibold'>
				<MessageSquare className='h-4 w-4' />
				Общение внутри CRM ({messages.length})
			</Label>

			{/* Сообщения */}
			<div className='border rounded-lg bg-muted/30 p-3 space-y-2 max-h-64 overflow-y-auto shadcn-scrollbar'>
				{messages.length === 0 ? (
					<p className='text-xs text-muted-foreground text-center py-4'>
						Нет сообщений
					</p>
				) : (
					messages.map(msg => (
						<div key={msg.id} className='space-y-1'>
							<div className='flex items-center gap-2'>
								<span className='text-xs font-medium'>{msg.userName}</span>
								<span className='text-[10px] text-muted-foreground'>
									{new Date(msg.createdAt).toLocaleDateString('ru-RU', {
										day: 'numeric',
										month: 'short',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
							<p className='text-xs text-slate-700 bg-background p-2 rounded border border-border'>
								{msg.text}
							</p>
						</div>
					))
				)}
			</div>

			{/* Поле ввода */}
			<div className='flex gap-2'>
				<Input
					placeholder='Написать сообщение...'
					value={messageText}
					onChange={e => setMessageText(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							handleSend()
						}
					}}
					className='text-sm h-9'
				/>
				<Button
					type='button'
					size='icon'
					className='h-9 w-9 shrink-0'
					onClick={handleSend}
					disabled={!messageText.trim()}
				>
					<Send className='h-4 w-4' />
				</Button>
			</div>
		</div>
	)
}
