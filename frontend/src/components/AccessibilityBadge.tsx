import type { AccessibilityFeature } from '../types'

type AccessibilityBadgeProps = {
  feature: AccessibilityFeature
}

export function AccessibilityBadge({ feature }: AccessibilityBadgeProps) {
  const Icon = feature.icon

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E4C31A]/15 px-3 py-1 text-xs font-semibold text-[#F5D742]">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {feature.label}
    </span>
  )
}
