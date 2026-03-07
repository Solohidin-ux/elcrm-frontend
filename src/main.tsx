import { Toaster } from '@/components/ui/sonner'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './i18n.ts'
import './index.css'
import { ThemeColorProvider } from './shared/utils/use-theme-color.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* router setup */}
		<ThemeColorProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
				<Toaster />
			</BrowserRouter>
		</ThemeColorProvider>
	</StrictMode>,
)
