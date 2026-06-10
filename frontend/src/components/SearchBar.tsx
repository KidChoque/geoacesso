import { Search, SlidersHorizontal } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar por local, recurso ou bairro',
}: SearchBarProps) {
  return (
    <form
      role="search"
      className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-[#111827] shadow-lg focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#E4C31A] sm:px-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <Search className="h-5 w-5 shrink-0 text-[#3357A8]" aria-hidden="true" />
      <label className="sr-only" htmlFor="search-establishments">
        Buscar estabelecimentos acessiveis
      </label>
      <input
        id="search-establishments"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#111827] placeholder:text-gray-500 focus:outline-none sm:text-base"
      />
      <button
        type="submit"
        className="hidden rounded-xl bg-[#E4C31A] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3357A8] sm:inline-flex"
      >
        Buscar
      </button>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#3357A8] transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3357A8] sm:hidden"
        aria-label="Abrir filtros"
      >
        <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  )
}
