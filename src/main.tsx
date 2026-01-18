import { Toaster } from '@/components/ui/sonner'
import { DndContext } from '@dnd-kit/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './i18n.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* router setup */}
		<DndContext>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</BrowserRouter>
		</DndContext>
		{/* shadcn toaster observer */}
		<Toaster />
	</StrictMode>,
)
