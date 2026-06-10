type FooterProps = {
  onSettingsClick: () => void
}

export function Footer({ onSettingsClick }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#111827] px-4 py-10 text-[#D1D5DB] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-white">GeoAcesso</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            Plataforma para encontrar estabelecimentos com recursos de acessibilidade,
            usando dados demonstrativos nesta versao frontend.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Navegacao</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a className="hover:text-[#E4C31A]" href="#home">
                Inicio
              </a>
            </li>
            <li>
              <a className="hover:text-[#E4C31A]" href="#comunidade">
                Comunidade
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Acesso</h3>
          <p className="mt-4 text-sm leading-relaxed">
            Contraste AA, navegacao por teclado, labels visiveis para leitores de tela e
            textos alternativos nas imagens.
          </p>
          <button
            type="button"
            onClick={onSettingsClick}
            className="mt-5 hidden rounded-xl border border-[#E4C31A] px-4 py-3 text-sm font-semibold text-[#E4C31A] transition hover:bg-[#E4C31A] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] md:inline-flex"
          >
            Configuracoes
          </button>
        </div>
      </div>
    </footer>
  )
}
