import { Building2, LogIn, LogOut, Menu, UserCircle } from 'lucide-react'
import desktopLogo from '../assets/logo geoacesso 1.png'
import mobileLogo from '../assets/logo simples geoacesso 1.png'
import { useAuth } from '../context/useAuth'
import { SearchBar } from './SearchBar'

type HeaderProps = {
  searchValue: string
  onSearchChange: (value: string) => void
  onLoginClick: () => void
  onProfileClick: () => void
  onLogout: () => void
  onAdminEstablishmentsClick: () => void
}

export function Header({
                         searchValue,
                         onSearchChange,
                         onLoginClick,
                         onProfileClick,
                         onLogout,
                         onAdminEstablishmentsClick,
                       }: HeaderProps) {
  const { isAuthenticated, userRole } = useAuth()

  return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111827]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
              href="#home"
              className="flex shrink-0 items-center gap-2 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4C31A]"
              aria-label="GeoAcesso - inicio"
          >
            <img className="h-10 w-10 rounded-xl object-contain md:hidden" src={mobileLogo} alt="" />
            <img className="hidden h-11 w-auto object-contain md:block" src={desktopLogo} alt="" />
          </a>

          <div className="min-w-0 flex-1">
            <SearchBar value={searchValue} onChange={onSearchChange} />
          </div>

          {isAuthenticated ? (
              <>
                {userRole === 'ADMIN' && (
                    <>
                      <button
                          type="button"
                          onClick={onAdminEstablishmentsClick}
                          className="hidden items-center gap-2 rounded-xl bg-[#E4C31A] px-3 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:inline-flex"
                      >
                        <Building2 className="h-5 w-5" aria-hidden="true" />
                        Cadastrar estabelecimento
                      </button>

                      <button
                          type="button"
                          onClick={onAdminEstablishmentsClick}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4C31A] text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:hidden"
                          aria-label="Cadastrar estabelecimento"
                      >
                        <Building2 className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </>
                )}

                <button
                    type="button"
                    onClick={onProfileClick}
                    className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:inline-flex"
                >
                  <UserCircle className="h-6 w-6" aria-hidden="true" />
                  Perfil
                </button>

                <button
                    type="button"
                    onClick={onProfileClick}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:hidden"
                    aria-label="Abrir perfil"
                >
                  <UserCircle className="h-6 w-6" aria-hidden="true" />
                </button>

                <button
                    type="button"
                    onClick={onLogout}
                    className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:inline-flex"
                >
                  <LogOut className="h-6 w-6" aria-hidden="true" />
                  Sair
                </button>

                <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:hidden"
                    aria-label="Sair"
                >
                  <LogOut className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
          ) : (
              <>
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:inline-flex"
                >
                  <LogIn className="h-6 w-6" aria-hidden="true" />
                  Login
                </button>

                <button
                    type="button"
                    onClick={onLoginClick}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:hidden"
                    aria-label="Abrir login"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
          )}
        </div>
      </header>
  )
}