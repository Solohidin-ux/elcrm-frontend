import * as React from 'react'

export type ThemeColor = 'default' | 'blue' | 'rose' | 'orange'

interface ThemeColorContextType {
	themeColor: ThemeColor
	setThemeColor: (color: ThemeColor) => void
}

const ThemeColorContext = React.createContext<ThemeColorContextType>({
	themeColor: 'default',
	setThemeColor: () => {},
})

export function ThemeColorProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [themeColor, setThemeColorState] = React.useState<ThemeColor>('default')
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
		const storedColor = localStorage.getItem('theme-color') as ThemeColor
		if (storedColor) {
			setThemeColorState(storedColor)
		}
	}, [])

	React.useEffect(() => {
		if (!isMounted) return

		const root = document.body
		// Удаляем все известные классы тем
		root.classList.remove('theme-blue', 'theme-rose', 'theme-orange')

		if (themeColor !== 'default') {
			root.classList.add(`theme-${themeColor}`)
		}

		localStorage.setItem('theme-color', themeColor)
	}, [themeColor, isMounted])

	return (
		<ThemeColorContext.Provider
			value={{ themeColor, setThemeColor: setThemeColorState }}
		>
			{children}
		</ThemeColorContext.Provider>
	)
}

export function useThemeColor() {
	return React.useContext(ThemeColorContext)
}
