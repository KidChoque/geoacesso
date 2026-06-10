import { ArrowLeft, Contrast, Moon, Type } from 'lucide-react'
import { useAppearance } from '../context/useAppearance'

type AppearanceSettingsPageProps = {
  onBackHome: () => void
}

const fontSizes = [
  { id: 'small', label: 'Pequena', description: 'Texto mais compacto' },
  { id: 'medium', label: 'Media', description: 'Padrao do sistema' },
  { id: 'large', label: 'Grande', description: 'Melhor leitura' },
] as const

type SwitchRowProps = {
  icon: typeof Moon
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function SwitchRow({ icon: Icon, title, description, checked, onChange }: SwitchRowProps) {
  return (
    <div className="rounded-2xl bg-[#374151] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-[#E4C31A]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-white">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-[#D1D5DB]">{description}</p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`relative h-8 w-14 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] ${
            checked ? 'bg-[#E4C31A]' : 'bg-[#111827]'
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
              checked ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export function AppearanceSettingsPage({ onBackHome }: AppearanceSettingsPageProps) {
  const { darkMode, highContrast, fontSize, setDarkMode, setHighContrast, setFontSize } =
    useAppearance()

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-[#1F2937] p-5 shadow-lg sm:p-8">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#E4C31A] px-4 py-2 text-sm font-semibold text-[#E4C31A] transition hover:bg-[#E4C31A] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Voltar para Home
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E4C31A]">
            Configuracoes
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Aparencia
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#D1D5DB] sm:text-base">
            Ajuste contraste, tema e tamanho da fonte. As preferencias ficam salvas neste
            navegador usando localStorage.
          </p>
        </div>

        <div className="space-y-4">
          <SwitchRow
            icon={Moon}
            title="Dark Mode"
            description="Mantem a interface no tema escuro predominante do GeoAcesso."
            checked={darkMode}
            onChange={setDarkMode}
          />

          <SwitchRow
            icon={Contrast}
            title="Alto Contraste"
            description="Reforca fundos, bordas e foco para melhorar a leitura e navegacao."
            checked={highContrast}
            onChange={setHighContrast}
          />

          <section className="rounded-2xl bg-[#374151] p-4 sm:p-5" aria-labelledby="font-size-title">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-[#E4C31A]">
                <Type className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 id="font-size-title" className="text-base font-bold text-white">
                  Tamanho da Fonte
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#D1D5DB]">
                  Escolha o tamanho de texto mais confortavel para leitura.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-labelledby="font-size-title">
              {fontSizes.map((option) => {
                const isActive = fontSize === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setFontSize(option.id)}
                    className={`rounded-xl p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] ${
                      isActive
                        ? 'bg-[#E4C31A] text-[#111827]'
                        : 'bg-[#111827] text-white hover:bg-[#1b2535]'
                    }`}
                  >
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span
                      className={`mt-1 block text-xs leading-5 ${
                        isActive ? 'text-[#111827]/75' : 'text-[#D1D5DB]'
                      }`}
                    >
                      {option.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
