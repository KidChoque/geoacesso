import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Navigation, Star } from 'lucide-react'
import type { Establishment } from '../types'
import { AccessibilityBadge } from './AccessibilityBadge'
import { buscarEnderecoPorCep } from '../services/cepService'

type EstablishmentDetailsProps = {
  establishment: Establishment
  onBack: () => void
}

export function EstablishmentDetails({ establishment, onBack }: EstablishmentDetailsProps) {
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null)
  const [isLoadingAddress, setIsLoadingAddress] = useState(false)

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
    setIsLoadingAddress(true)
    buscarEnderecoPorCep(cep)
      .then((addr) => {
        const formatted = `${addr.logradouro}, ${addr.bairro}, ${addr.localidade} - ${addr.uf}, CEP: ${addr.cep}`
        setResolvedAddress(formatted)
      })
      .catch((err) => {
        console.error('Falha ao obter endereço completo:', err)
        setResolvedAddress(establishment.address)
      })
      .finally(() => {
        setIsLoadingAddress(false)
      })
  }, [establishment])

   const description = localDescription;

  return (
    <article className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#E4C31A] px-4 py-3 text-sm font-semibold text-[#E4C31A] transition hover:bg-[#E4C31A] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A]"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Voltar para estabelecimentos
      </button>

      <div className="overflow-hidden rounded-[28px] bg-[#1F2937] shadow-lg">
        <div className="relative min-h-[340px]">
          <img
            className="h-[340px] w-full object-cover sm:h-[460px]"
            src={establishment.imageUrl}
            alt={`Imagem em destaque de ${establishment.name}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <span className="inline-flex rounded-full bg-[#E4C31A] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#111827]">
              {establishment.category}
            </span>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {establishment.name}
                </h1>
                <p className="mt-3 flex gap-2 text-sm leading-relaxed text-[#D1D5DB] sm:text-base">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E4C31A]" aria-hidden="true" />
                  {isLoadingAddress ? (
                    <span className="text-xs text-gray-400 animate-pulse">Carregando endereço...</span>
                  ) : (
                    resolvedAddress || establishment.address
                  )}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#111827]/90 px-4 py-2 text-base font-bold text-[#E4C31A]">
                <Star className="h-5 w-5 fill-[#E4C31A]" aria-hidden="true" />
                {establishment.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-[#374151] p-5 sm:p-6" aria-labelledby="details-description">
            <h2 id="details-description" className="text-2xl font-bold text-white">
              Sobre o local
            </h2>
            <p className="mt-4 text-base leading-8 text-[#D1D5DB]">{description}</p>
          </section>

          <section className="rounded-3xl bg-[#374151] p-5 sm:p-6" aria-labelledby="details-map">
            <h2 id="details-map" className="text-2xl font-bold text-white">
              Posicao no mapa
            </h2>
            <div className="mt-4 rounded-2xl border border-[#E4C31A]/40 bg-[#111827] p-5">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E4C31A] text-[#111827]">
                  <Navigation className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Coordenadas mockadas</p>
                  <p className="mt-1 text-sm leading-6 text-[#D1D5DB]">
                    Lat {establishment.position.lat.toFixed(6)}, Lng{' '}
                    {establishment.position.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#9CA3AF]">
                Este bloco esta preparado para receber o Google Maps e indicar a localizacao exata
                do estabelecimento.
              </p>
            </div>
          </section>

          <section className="rounded-3xl bg-[#374151] p-5 sm:p-6 lg:col-span-2" aria-labelledby="details-features">
            <h2 id="details-features" className="text-2xl font-bold text-white">
              Recursos acessiveis
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {establishment.features.map((feature) => (
                <AccessibilityBadge key={feature.id} feature={feature} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
