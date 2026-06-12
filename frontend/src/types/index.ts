import type { LucideIcon } from 'lucide-react'

export type Category = {
  id: string
  label: string
  icon: LucideIcon
}

export type AccessibilityFeature = {
  id: string
  label: string
  icon: LucideIcon
}

export type Establishment = {
  id: string
  name: string
  description?: string
  address: string
  imageUrl: string
  rating: number
  distance: string
  category: string
  position: {
    lat: number
    lng: number
  }
  features: AccessibilityFeature[]
}
