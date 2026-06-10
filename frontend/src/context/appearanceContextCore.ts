import { createContext } from 'react'

export type FontSize = 'small' | 'medium' | 'large'

export type AppearanceSettings = {
  darkMode: boolean
  highContrast: boolean
  fontSize: FontSize
}

export type AppearanceContextValue = AppearanceSettings & {
  setDarkMode: (value: boolean) => void
  setHighContrast: (value: boolean) => void
  setFontSize: (value: FontSize) => void
}

export const defaultAppearanceSettings: AppearanceSettings = {
  darkMode: true,
  highContrast: false,
  fontSize: 'medium',
}

export const AppearanceContext = createContext<AppearanceContextValue | null>(null)
