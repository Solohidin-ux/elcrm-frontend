import { Plus, StickyNote } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { Note } from '@/shared/utils/moc-data'

interface TaskNotesProps {
	notes: Note[]
	onAddNote: (text: string, isPersonal: boolean) => void
	currentUser?: string
}

export default function TaskNotes({
	notes,
	onAddNote,
}: TaskNotesProps) {
	const [newNoteText, setNewNoteText] = useState('')
	const [isPersonal, setIsPersonal] = useState(false)
	const [showAddForm, setShowAddForm] = useState(false)

	const handleAdd = () => {
		const text = newNoteText.trim()
		if (!text) return

		onAddNote(text, isPersonal)
		setNewNoteText('')
		setIsPersonal(false)
		setShowAddForm(false)
	}

	return (
		<div className='space-y-3'>
			<div className='flex items-center justify-between'>
				<Label className='flex items-center gap-2 text-sm font-semibold'>
					<StickyNote className='h-4 w-4' />
					Заметки ({notes.length})
				</Label>
				<Button
					type='button'
					variant='outline'
					size='sm'
					className='h-7 text-xs'
					onClick={() => setShowAddForm(!showAddForm)}
				>
					<Plus className='h-3 w-3 mr-1' />
					Добавить
				</Button>
			</div>

			{showAddForm && (
				<div className='p-3 rounded-lg border bg-muted/30 space-y-2'>
					<Input
						placeholder='Введите заметку...'
						value={newNoteText}
						onChange={e => setNewNoteText(e.target.value)}
						onKeyDown={e => {
							if (e.key === 'Enter' && e.ctrlKey) {
								e.preventDefault()
								handleAdd()
							}
						}}
						className='text-sm'
					/>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<Switch
								id='personal-note'
								checked={isPersonal}
								onCheckedChange={setIsPersonal}
							/>
							<Label htmlFor='personal-note' className='text-xs cursor-pointer'>
								Личная заметка
							</Label>
						</div>
						<div className='flex gap-2'>
							<Button
								type='button'
								variant='ghost'
								size='sm'
								className='h-7 text-xs'
								onClick={() => {
									setShowAddForm(false)
									setNewNoteText('')
								}}
							>
								Отмена
							</Button>
							<Button
								type='button'
								size='sm'
								className='h-7 text-xs'
								onClick={handleAdd}
								disabled={!newNoteText.trim()}
							>
								Сохранить
							</Button>
						</div>
					</div>
				</div>
			)}

			{notes.length === 0 ? (
				<p className='text-xs text-muted-foreground text-center py-4'>
					Нет заметок
				</p>
			) : (
				<div className='space-y-2 max-h-64 overflow-y-auto shadcn-scrollbar'>
					{notes.map(note => (
						<div
							key={note.id}
							className={cn(
								'p-2.5 rounded-lg border text-sm',
								note.isPersonal
									? 'bg-yellow-50/50 border-yellow-200'
									: 'bg-muted/50 border-border',
							)}
						>
							<div className='flex items-start justify-between gap-2'>
								<p className='flex-1 text-xs'>{note.text}</p>
								{note.isPersonal && (
									<span className='text-[10px] text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded'>
										Личная
									</span>
								)}
							</div>
							<div className='flex items-center justify-between mt-1.5'>
								<span className='text-[10px] text-muted-foreground'>
									{note.createdBy}
								</span>
								<span className='text-[10px] text-muted-foreground'>
									{new Date(note.createdAt).toLocaleDateString('ru-RU', {
										day: 'numeric',
										month: 'short',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
