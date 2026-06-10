import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  AppearanceContext,
  defaultAppearanceSettings,
  type AppearanceContextValue,
  type AppearanceSettings,
} from './appearanceContextCore'

const STORAGE_KEY = 'geoacesso_appearance_settings'

function loadStoredSettings(): AppearanceSettings {
  try {
    const storedSettings = window.localStorage.getItem(STORAGE_KEY)

    if (!storedSettings) {
      return defaultAppearanceSettings
    }

    return {
      ...defaultAppearanceSettings,
      ...(JSON.parse(storedSettings) as Partial<AppearanceSettings>),
    }
  } catch {
    return defaultAppearanceSettings
  }
}

type AppearanceProviderProps = {
  children: ReactNode
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const [settings, setSettings] = useState<AppearanceSettings>(loadStoredSettings)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))

    const root = document.documentElement
    root.dataset.theme = settings.darkMode ? 'dark' : 'light'
    root.dataset.contrast = settings.highContrast ? 'high' : 'default'
    root.dataset.fontSize = settings.fontSize
  }, [settings])

  const value = useMemo<AppearanceContextValue>(
    () => ({
      ...settings,
      setDarkMode: (darkMode) => setSettings((current) => ({ ...current, darkMode })),
      setHighContrast: (highContrast) =>
        setSettings((current) => ({ ...current, highContrast })),
      setFontSize: (fontSize) => setSettings((current) => ({ ...current, fontSize })),
    }),
    [settings],
  )

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}
