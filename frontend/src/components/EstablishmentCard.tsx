import { useEffect, useState } from 'react'
import { MapPin, Star } from 'lucide-react'
import type { Establishment } from '../types'
import { AccessibilityBadge } from './AccessibilityBadge'
import { buscarEnderecoPorCep } from '../services/cepService'

type EstablishmentCardProps = {
  establishment: Establishment
  onViewDetails: (establishment: Establishment) => void
}

export function EstablishmentCard({ establishment, onViewDetails }: EstablishmentCardProps) {
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null)

  // Load description from localStorage based on CNPJ (id)
  const [localDescription, setLocalDescription] = useState<string>('')
  useEffect(() => {
    const desc = localStorage.getItem(`descricaoEstabelecimento:${establishment.id}`)
    if (desc) setLocalDescription(desc)
    else setLocalDescription('Informações de acessibilidade cadastradas pelo administrador.')
  }, [establishment.id])

  useEffect(() => {
    const isReal = establishment.address.startsWith('CEP:')
    if (!isReal) {
      setResolvedAddress(establishment.address)
      return
    }

    const cep = establishment.address.replace('CEP:', '').trim()
    buscarEnderecoPorCep(cep)
      .then((addr) => {
        const formatted = `${addr.logradouro}, ${addr.bairro}, ${addr.localidade}/${addr.uf}, CEP: ${addr.cep}`
        setResolvedAddress(formatted)
      })
      .catch((err) => {
        console.error('Falha ao obter endereço para o card:', err)
        setResolvedAddress(establishment.address)
      })
  }, [establishment.address])

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#374151] shadow-lg transition hover:-translate-y-1 hover:bg-[#3f4b5f]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={establishment.imageUrl}
          alt={`Foto de ${establishment.name}`}
        />
        <div className="absolute left-3 top-3 rounded-full bg-[#111827]/90 px-3 py-1 text-xs font-semibold text-white">
          {establishment.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-tight text-white">{establishment.name}</h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#111827]/80 px-2 py-1 text-sm font-semibold text-[#E4C31A]">
              <Star className="h-4 w-4 fill-[#E4C31A]" aria-hidden="true" />
              {establishment.rating.toFixed(1)}
            </span>
          </div>
          <p className="flex gap-2 text-sm leading-relaxed text-[#D1D5DB]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E4C31A]" aria-hidden="true" />
            <span>
              {resolvedAddress || establishment.address} · {establishment.distance}
            </span>
          </p>
          <p className="mt-1 text-sm text-[#D1D5DB]">
            {localDescription}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {establishment.features.map((feature) => (
            <AccessibilityBadge key={feature.id} feature={feature} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => onViewDetails(establishment)}
          className="mt-auto inline-flex items-center justify-center rounded-xl bg-[#E4C31A] px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D742]"
        >
          Ver detalhes
        </button>
      </div>
    </article>
  )
}
