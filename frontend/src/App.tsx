import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { BottomNavigation } from './components/BottomNavigation'
import { CategoryBar } from './components/CategoryBar'
import { EstablishmentCard } from './components/EstablishmentCard'
import { EstablishmentDetails } from './components/EstablishmentDetails'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useAuth } from './context/useAuth'
import { accessibilityFeatures, bottomNavigationItems, categories, establishments } from './data/mockData'
import { AdminEstablishmentsPage } from './pages/AdminEstablishmentsPage'
import { AppearanceSettingsPage } from './pages/AppearanceSettingsPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterUserPage } from './pages/RegisterUserPage'
import type { Establishment } from './types'
import { listarEstabelecimentosPublico } from './services/establishmentService'

const mapBackendAcessibilidadeToFrontend = (backendAcess: string) => {
  const norm = backendAcess.trim().toUpperCase()
  let targetId = ''
  if (norm === 'RAMPA') targetId = 'ramp'
  else if (norm === 'BANHEIRO_ADAPTADO') targetId = 'bathroom'
  else if (norm === 'ELEVADOR') targetId = 'elevator'
  else if (norm === 'PISO_TATIL') targetId = 'tactile-floor'
  else if (norm === 'VAGA_PCD') targetId = 'parking'
  else if (norm === 'SINALIZACAO_BRAILE') targetId = 'braille'
  else if (norm === 'ATENDIMENTO_LIBRAS') targetId = 'libras'
  else if (norm === 'SINALIZACAO_VISUAL') targetId = 'visual'
  else if (norm === 'SINALIZACAO_SIMPLES') targetId = 'visual'
  else if (norm === 'ATENDIMENTO_PRIORITARIO') targetId = 'ramp'

  const matched = accessibilityFeatures.find(f => f.id === targetId)
  if (matched) return matched
  return accessibilityFeatures[0]
}

type AuthPage = 'login' | 'register' | null
type MainPage = 'home' | 'profile' | 'settings' | 'admin-establishments'

function App() {
  const { isAuthenticated, userRole, logout } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null)
  const [authPage, setAuthPage] = useState<AuthPage>(null)
  const [mainPage, setMainPage] = useState<MainPage>('home')
  const [allEstablishments, setAllEstablishments] = useState<Establishment[]>(establishments)
  const [loadingEstabs, setLoadingEstabs] = useState<boolean>(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (mainPage === 'admin-establishments' && userRole !== 'ADMIN') {
      setMainPage('home')
    }
  }, [mainPage, userRole])

  useEffect(() => {
    if (mainPage !== 'home') return;
    let active = true;
    setLoadingEstabs(true);
    setLoadError(null);
    listarEstabelecimentosPublico()
      .then((data) => {
        if (!active) return;
        const mapped: Establishment[] = data.map((item) => {
          const mappedFeatures = (item.acessibilidades || [])
            .map(mapBackendAcessibilidadeToFrontend)
            .filter(Boolean);

          const categoryName = item.servico
            ? item.servico.charAt(0).toUpperCase() + item.servico.slice(1).toLowerCase()
            : 'Outro';

          return {
            id: item.cnpj,
            name: item.nome,
            description: `Estabelecimento do tipo ${categoryName} cadastrado no GeoAcesso.`,
            address: `CEP: ${item.cep}`,
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
            rating: 4.8,
            distance: '1,2 km',
            category: categoryName,
            position: { lat: -23.561414, lng: -46.655881 },
            features: mappedFeatures,
          };
        });
        if (active) {
          setAllEstablishments(mapped.length > 0 ? mapped : establishments);
          setLoadingEstabs(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Falha ao obter estabelecimentos do backend. Usando dados locais.', err);
          setAllEstablishments(establishments);
          setLoadError('Não foi possível carregar os estabelecimentos.');
          setLoadingEstabs(false);
        }
      });
    return () => {
      active = false;
    };
  }, [mainPage, refreshKey]);

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

    return allEstablishments.filter((establishment) => {
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
  }, [allEstablishments, activeCategory, searchValue])

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
    if (userRole !== 'ADMIN') {
      setMainPage('home')
      return
    }
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
            <AdminEstablishmentsPage onBackHome={handleBackHome} onRefresh={() => setRefreshKey(prev => prev + 1)} />
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
                       {loadingEstabs && <span className="ml-2 text-sm text-[#E4C31A]">Carregando...</span>}
                       {loadError && <p className="mt-2 text-sm text-red-400">{loadError}</p>}
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