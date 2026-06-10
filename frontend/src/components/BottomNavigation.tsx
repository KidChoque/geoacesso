import type { LucideIcon } from 'lucide-react'

type BottomNavigationItem = {
  id: string
  label: string
  icon: LucideIcon
  href: string
}

type BottomNavigationProps = {
  items: BottomNavigationItem[]
  activeItem: string
  onItemClick?: (itemId: string) => void
}

export function BottomNavigation({ items, activeItem, onItemClick }: BottomNavigationProps) {
  return (
    <nav
      aria-label="Navegacao principal mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#111827]/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur md:hidden"
    >
      <ul
        className="mx-auto grid max-w-md gap-1"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={(event) => {
                  if (onItemClick) {
                    event.preventDefault()
                    onItemClick(item.id)
                  }
                }}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] ${
                  isActive ? 'text-[#E4C31A]' : 'text-white hover:bg-white/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
