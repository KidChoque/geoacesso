export type MockAccount = {
  id: string
  name: string
  email: string
  password: string
}

const STORAGE_KEY = 'geoacesso_mock_accounts'

const initialMockAccounts: MockAccount[] = [
  {
    id: 'user-1',
    name: 'Usuario Teste',
    email: 'teste@geoacesso.com',
    password: '123456',
  },
]

function readStoredAccounts() {
  try {
    const storedAccounts = window.localStorage.getItem(STORAGE_KEY)
    return storedAccounts ? (JSON.parse(storedAccounts) as MockAccount[]) : []
  } catch {
    return []
  }
}

function writeStoredAccounts(accounts: MockAccount[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export function getMockAccounts() {
  return [...initialMockAccounts, ...readStoredAccounts()]
}

export function findMockAccountByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase()
  return getMockAccounts().find((account) => account.email.toLowerCase() === normalizedEmail)
}

export function createMockAccount(account: Omit<MockAccount, 'id'>) {
  if (findMockAccountByEmail(account.email)) {
    return { account: null, error: 'Ja existe uma conta mockada com este email.' }
  }

  const storedAccounts = readStoredAccounts()
  const newAccount: MockAccount = {
    ...account,
    id: `user-${Date.now()}`,
    email: account.email.trim().toLowerCase(),
  }

  writeStoredAccounts([...storedAccounts, newAccount])
  return { account: newAccount, error: '' }
}

export function validateMockLogin(email: string, password: string) {
  const account = findMockAccountByEmail(email)

  if (!account || account.password !== password) {
    return { account: null, error: 'Email ou senha invalidos para as contas mockadas.' }
  }

  return { account, error: '' }
}
