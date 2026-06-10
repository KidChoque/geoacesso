import { useMemo, useState } from 'react'
import './App.css'
import { BottomNavigation } from './components/BottomNavigation'
import { CategoryBar } from './components/CategoryBar'
import { EstablishmentCard } from './components/EstablishmentCard'
import { EstablishmentDetails } from './components/EstablishmentDetails'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useAuth } from './context/useAuth'
import { bottomNavigationItems, categories, establishments } from './data/mockData'
import { AdminEstablishmentsPage } from './pages/AdminEstablishmentsPage'
import { AppearanceSettingsPage } from './pages/AppearanceSettingsPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterUserPage } from './pages/RegisterUserPage'
import type { Establishment } from './types'

type AuthPage = 'login' | 'register' | null
type MainPage = 'home' | 'profile' | 'settings' | 'admin-establishments'

function App() {
  const { isAuthenticated, userRole, logout } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null)
  const [authPage, setAuthPage] = useState<AuthPage>(null)
  const [mainPage, setMainPage] = useState<MainPage>('home')

  const visibleBottomNavigationItems = useMemo(
      () =>
          isAuthenticated
              ? bottomNavigationItems
              : bottomNavigationItems.filter(
                  (item) => item.id !== 'profile' && item.id !== 'community',
              ),
      [isAuthenticated],
  )

  const filteredEstablishments = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return establishments.filter((establishment) => {
      const matchesSearch =
          normalizedSearch.length === 0 ||
          establishment.name.toLowerCase().includes(normalizedSearch) ||
          establishment.address.toLowerCase().includes(normalizedSearch) ||
          establishment.category.toLowerCase().includes(normalizedSearch) ||
          establishment.features.some((feature) =>
              feature.label.toLowerCase().includes(normalizedSearch),
          )

      const matchesCategory =
          activeCategory === null ||
          establishment.features.some((feature) => feature.id === activeCategory)

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, searchValue])

  const handleViewDetails = (establishment: Establishment) => {
    setSelectedEstablishment(establishment)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToList = () => {
    setSelectedEstablishment(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenLogin = () => {
    setSelectedEstablishment(null)
    setMainPage('home')
    setAuthPage('login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenRegister = () => {
    setSelectedEstablishment(null)
    setMainPage('home')
    setAuthPage('register')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackHome = () => {
    setAuthPage(null)
    setMainPage('home')
    setSelectedEstablishment(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenProfile = () => {
    setAuthPage(null)
    setSelectedEstablishment(null)
    setMainPage('profile')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenSettings = () => {
    setAuthPage(null)
    setSelectedEstablishment(null)
    setMainPage('settings')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenAdminEstablishments = () => {
    setAuthPage(null)
    setSelectedEstablishment(null)
    setMainPage('admin-establishments')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    logout()
    handleBackHome()
  }

  const handleBottomNavigation = (itemId: string) => {
    if (itemId === 'profile') {
      handleOpenProfile()
      return
    }

    if (itemId === 'settings') {
      handleOpenSettings()
      return
    }

    setSelectedEstablishment(null)
    setMainPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (authPage === 'login') {
    return <LoginPage onBackHome={handleBackHome} onCreateAccount={handleOpenRegister} />
  }

  if (authPage === 'register') {
    return <RegisterUserPage onBackHome={handleBackHome} onLoginClick={handleOpenLogin} />
  }

  return (
      <div id="home" className="min-h-screen bg-transparent text-white">
        <Header
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onLoginClick={handleOpenLogin}
            onProfileClick={handleOpenProfile}
            onLogout={handleLogout}
            onAdminEstablishmentsClick={handleOpenAdminEstablishments}
        />

        {mainPage === 'admin-establishments' && userRole === 'ADMIN' ? (
            <AdminEstablishmentsPage onBackHome={handleBackHome} />
        ) : mainPage === 'profile' ? (
            <ProfilePage onBackHome={handleBackHome} />
        ) : mainPage === 'settings' ? (
            <AppearanceSettingsPage onBackHome={handleBackHome} />
        ) : selectedEstablishment ? (
            <main>
              <EstablishmentDetails establishment={selectedEstablishment} onBack={handleBackToList} />
            </main>
        ) : (
            <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
              <section className="grid gap-8 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#E4C31A]">
                    Acessibilidade perto de voce
                  </p>
                  <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Encontre lugares preparados para receber todas as pessoas.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#D1D5DB] sm:text-lg">
                    Explore estabelecimentos com rampas, banheiros adaptados, Libras, Braille,
                    estacionamento acessivel e outros recursos essenciais.
                  </p>
                </div>

                <aside className="rounded-[20px] bg-[#1F2937] p-5 shadow-lg">
                  <p className="text-sm font-semibold text-[#E4C31A]">Dados mockados</p>
                  <p className="mt-2 text-sm leading-6 text-[#D1D5DB]">
                    Esta interface usa informacoes demonstrativas para validar componentes,
                    responsividade e navegacao. Nenhum backend foi implementado.
                  </p>
                </aside>
              </section>

              <section className="sticky top-[72px] z-40 -mx-4 border-y border-white/10 bg-[#111827]/90 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#E4C31A]">
                  Recursos Acessiveis necessarios
                </p>
                <CategoryBar
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
              </section>

              <section className="py-8" aria-labelledby="establishments-title">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 id="establishments-title" className="text-2xl font-bold text-white sm:text-3xl">
                      Estabelecimentos acessiveis
                    </h2>
                    <p className="mt-2 text-sm text-[#D1D5DB]">
                      {filteredEstablishments.length} estabelecimento(s) encontrado(s)
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#9CA3AF]">
                    Ordenado por melhor avaliacao e proximidade
                  </p>
                </div>

                {filteredEstablishments.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                      {filteredEstablishments.map((establishment) => (
                          <EstablishmentCard
                              key={establishment.id}
                              establishment={establishment}
                              onViewDetails={handleViewDetails}
                          />
                      ))}
                    </div>
                ) : (
                    <div className="rounded-2xl bg-[#1F2937] p-8 text-center shadow-lg">
                      <h3 className="text-xl font-semibold text-white">Nenhum resultado encontrado</h3>
                      <p className="mt-2 text-sm text-[#D1D5DB]">
                        Ajuste a busca ou selecione outra categoria de acessibilidade.
                      </p>
                    </div>
                )}
              </section>
            </main>
        )}

        <Footer onSettingsClick={handleOpenSettings} />
        <BottomNavigation
            items={visibleBottomNavigationItems}
            activeItem={
              mainPage === 'settings'
                  ? 'settings'
                  : mainPage === 'profile'
                      ? 'profile'
                      : mainPage === 'admin-establishments'
                          ? 'home'
                          : 'home'
            }
            onItemClick={handleBottomNavigation}
        />
      </div>
  )
}

export default App