import { api, TOKEN_STORAGE_KEY } from './api'

export type LoginCredentials = {
  email: string
  senha: string
}

export type RegisterUserData = {
  nome: string
  email: string
  senha: string
  confirmarSenha: string
}

/**
 * Autentica o usuário no backend (POST /login) e salva o JWT no localStorage.
 * O backend retorna o token como string pura no corpo da resposta.
 */
export async function login(email: string, senha: string): Promise<string> {
  const { data } = await api.post<string>('/login', {
    email,
    senha,
  } satisfies LoginCredentials)

  const token = typeof data === 'string' ? data.trim() : String(data)

  localStorage.setItem(TOKEN_STORAGE_KEY, token)

  return token
}

/**
 * Cadastra um novo usuário no backend (POST /cadastro/usuarios).
 * O backend responde 201 Created sem corpo relevante.
 */
export async function registerUser(data: RegisterUserData): Promise<void> {
  await api.post('/cadastro/usuarios', data)
}

/** Remove o token salvo, encerrando a sessão local. */
export function logout(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
}

/** Retorna o JWT salvo no localStorage, ou null se não houver. */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

/** Indica se existe um token salvo (sessão ativa no cliente). */
export function isAuthenticated(): boolean {
  return getToken() !== null
}
