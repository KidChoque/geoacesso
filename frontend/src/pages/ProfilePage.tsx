import { Grid3X3, Heart, MapPin, PenLine } from 'lucide-react'
import { useState } from 'react'

type ProfilePageProps = {
  onBackHome: () => void
}

const profile = {
  name: 'Marina Acessivel',
  username: '@marina.acesso',
  bio: 'Mapeando lugares inclusivos em Sao Paulo. Avalio rotas, atendimento e recursos que ajudam pessoas a circularem com autonomia.',
  avatar:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  counters: {
    publications: 24,
    followers: 1280,
    following: 312,
  },
}

const publications = [
  {
    id: 'pub-1',
    title: 'Cafe com rampa e Libras',
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    location: 'Bela Vista',
  },
  {
    id: 'pub-2',
    title: 'Biblioteca com piso tatil',
    imageUrl:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    location: 'Liberdade',
  },
  {
    id: 'pub-3',
    title: 'Parque sensorial',
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
    location: 'Ibirapuera',
  },
  {
    id: 'pub-4',
    title: 'Restaurante com circulacao ampla',
    imageUrl:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
    location: 'Pinheiros',
  },
  {
    id: 'pub-5',
    title: 'Hotel com quarto adaptado',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    location: 'Jardins',
  },
  {
    id: 'pub-6',
    title: 'Cinema com recursos visuais',
    imageUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    location: 'Pinheiros',
  },
]

const likedPosts = [
  publications[1],
  publications[4],
  publications[2],
]

export function ProfilePage({ onBackHome }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'publications' | 'likes'>('publications')
  const posts = activeTab === 'publications' ? publications : likedPosts

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl overflow-x-hidden px-4 pb-24 pt-28 text-white sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-[#1F2937] p-4 shadow-lg sm:p-8">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-6 rounded-xl border border-[#E4C31A] px-4 py-2 text-sm font-semibold text-[#E4C31A] transition hover:bg-[#E4C31A] hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A]"
        >
          Voltar para Home
        </button>

        <div className="grid min-w-0 gap-6 sm:grid-cols-[160px_1fr] sm:items-start">
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#E4C31A] bg-[#374151] sm:mx-0 sm:h-40 sm:w-40">
            <img className="h-full w-full object-cover" src={profile.avatar} alt={profile.name} />
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {profile.name}
                </h1>
                <p className="mt-1 text-sm font-semibold text-[#E4C31A]">{profile.username}</p>
              </div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E4C31A] px-4 py-3 text-sm font-bold text-[#111827] transition hover:bg-[#F5D742] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D742] sm:w-fit"
              >
                <PenLine className="h-5 w-5" aria-hidden="true" />
                Editar Perfil
              </button>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-2 text-center sm:max-w-md sm:gap-3">
              <div className="min-w-0 rounded-2xl bg-[#374151] p-2 sm:p-3">
                <dt className="truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#D1D5DB] sm:text-xs sm:tracking-[0.12em]">
                  Publicacoes
                </dt>
                <dd className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                  {profile.counters.publications}
                </dd>
              </div>
              <div className="min-w-0 rounded-2xl bg-[#374151] p-2 sm:p-3">
                <dt className="truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#D1D5DB] sm:text-xs sm:tracking-[0.12em]">
                  Seguidores
                </dt>
                <dd className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                  {profile.counters.followers.toLocaleString('pt-BR')}
                </dd>
              </div>
              <div className="min-w-0 rounded-2xl bg-[#374151] p-2 sm:p-3">
                <dt className="truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-[#D1D5DB] sm:text-xs sm:tracking-[0.12em]">
                  Seguindo
                </dt>
                <dd className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                  {profile.counters.following}
                </dd>
              </div>
            </dl>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#D1D5DB] sm:text-base">
              {profile.bio}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-[#1F2937] p-3 shadow-lg sm:p-6">
        <div
          className="grid grid-cols-2 gap-2 border-b border-white/10 pb-4"
          role="tablist"
          aria-label="Conteudo do perfil"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'publications'}
            onClick={() => setActiveTab('publications')}
            className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] sm:px-4 sm:text-sm ${
              activeTab === 'publications'
                ? 'bg-[#E4C31A] text-[#111827]'
                : 'bg-[#374151] text-white hover:bg-[#465469]'
            }`}
          >
            <Grid3X3 className="h-5 w-5" aria-hidden="true" />
            <span className="truncate">Publicacoes</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'likes'}
            onClick={() => setActiveTab('likes')}
            className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4C31A] sm:px-4 sm:text-sm ${
              activeTab === 'likes'
                ? 'bg-[#E4C31A] text-[#111827]'
                : 'bg-[#374151] text-white hover:bg-[#465469]'
            }`}
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            <span className="truncate">Curtidas</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" role="tabpanel">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#374151]"
            >
              <img
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                src={post.imageUrl}
                alt={post.title}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#111827]/95 via-[#111827]/20 to-transparent p-3 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <h2 className="text-sm font-bold text-white">{post.title}</h2>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#E4C31A]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
