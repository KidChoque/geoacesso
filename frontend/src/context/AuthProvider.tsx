import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import * as authService from '../services/authService'
import { AuthContext, type AuthContextValue, type UserRole } from './authContextCore'

const ROLE_STORAGE_KEY = 'userRole'

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
        authService.isAuthenticated(),
    )

    const [userRole, setUserRoleState] = useState<UserRole>(() => {
        const role = localStorage.getItem(ROLE_STORAGE_KEY)
        return role === 'ADMIN' || role === 'USER' ? role : null
    })

    function setUserRole(role: UserRole) {
        if (role) {
            localStorage.setItem(ROLE_STORAGE_KEY, role)
        } else {
            localStorage.removeItem(ROLE_STORAGE_KEY)
        }

        setUserRoleState(role)
    }

    const value = useMemo<AuthContextValue>(
        () => ({
            isAuthenticated,
            userRole,
            setUserRole,
            login: async (email, senha) => {
                const token = await authService.login(email, senha)
                setIsAuthenticated(true)
                const role: UserRole = email.trim().toLowerCase() === 'admin@email.com.br' ? 'ADMIN' : 'USER'
                setUserRole(role)
                return token
            },
            logout: () => {
                authService.logout()
                localStorage.removeItem(ROLE_STORAGE_KEY)
                setUserRoleState(null)
                setIsAuthenticated(false)
            },
        }),
        [isAuthenticated, userRole],
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}