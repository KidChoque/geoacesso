import { createContext } from 'react'

export type UserRole = 'ADMIN' | 'USER' | null

export type AuthContextValue = {
  isAuthenticated: boolean
  userRole: UserRole
  login: (email: string, senha: string) => Promise<string>
  logout: () => void
  setUserRole: (role: UserRole) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)