import type { Category } from '../types'

type CategoryBarProps = {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function CategoryBar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryBarProps) {
  return (
    <nav aria-label="Categorias de acessibilidade" className="w-full">
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(isActive ? null : category.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] ${
                isActive
                  ? 'bg-[#E4C31A] text-[#111827] hover:bg-[#F5D742]'
                  : 'bg-[#1F2937] text-white hover:bg-[#374151]'
              }`}
              aria-pressed={isActive}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {category.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
