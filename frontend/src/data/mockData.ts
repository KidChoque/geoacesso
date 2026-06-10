import {
  Accessibility,
  Bath,
  Building2,
  Car,
  Dog,
  Ear,
  Eye,
  Hand,
  Home,
  MessageCircle,
  Route,
  Settings,
  Type,
  User,
} from 'lucide-react'
import type { AccessibilityFeature, Category, Establishment } from '../types'

export const accessibilityFeatures: AccessibilityFeature[] = [
  { id: 'ramp', label: 'Rampa', icon: Accessibility },
  { id: 'bathroom', label: 'Banheiro Adaptado', icon: Bath },
  { id: 'elevator', label: 'Elevador', icon: Building2 },
  { id: 'parking', label: 'Estacionamento', icon: Car },
  { id: 'braille', label: 'Braille', icon: Type },
  { id: 'libras', label: 'Libras', icon: Hand },
  { id: 'guide-dog', label: 'Cao-guia', icon: Dog },
  { id: 'hearing', label: 'Auditiva', icon: Ear },
  { id: 'visual', label: 'Visual', icon: Eye },
  { id: 'tactile-floor', label: 'Piso tatil', icon: Route },
]

const feature = (id: string) => accessibilityFeatures.find((item) => item.id === id)!

export const categories: Category[] = [
  { id: 'ramp', label: 'Rampa', icon: Accessibility },
  { id: 'bathroom', label: 'Banheiro Adaptado', icon: Bath },
  { id: 'elevator', label: 'Elevador', icon: Building2 },
  { id: 'parking', label: 'Estacionamento', icon: Car },
  { id: 'braille', label: 'Braille', icon: Type },
  { id: 'libras', label: 'Libras', icon: Hand },
  { id: 'guide-dog', label: 'Cao-guia', icon: Dog },
  { id: 'hearing', label: 'Auditiva', icon: Ear },
  { id: 'visual', label: 'Visual', icon: Eye },
  { id: 'tactile-floor', label: 'Piso tatil', icon: Route },
]

export const establishments: Establishment[] = [
  {
    id: '1',
    name: 'Cafe Aurora Inclusivo',
    description:
      'Cafeteria com circulacao ampla, atendimento preparado para Libras e mesas com altura acessivel para cadeirantes. O ambiente foi pensado para encontros rapidos, trabalho remoto e pausas com conforto.',
    address: 'Av. Paulista, 1578 - Bela Vista, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    distance: '1,2 km',
    category: 'Cafe',
    position: { lat: -23.561414, lng: -46.655881 },
    features: [feature('ramp'), feature('bathroom'), feature('libras')],
  },
  {
    id: '2',
    name: 'Biblioteca Central Acessivel',
    description:
      'Biblioteca publica com acervo em Braille, sinalizacao visual reforcada e rotas internas com piso tatil. Possui areas silenciosas, atendimento orientado e espacos de leitura acessiveis.',
    address: 'Rua Vergueiro, 1000 - Liberdade, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    distance: '2,4 km',
    category: 'Cultura',
    position: { lat: -23.570528, lng: -46.639477 },
    features: [feature('parking'), feature('braille'), feature('visual'), feature('tactile-floor')],
  },
  {
    id: '3',
    name: 'Mercado Vila Livre',
    description:
      'Mercado de bairro com entrada nivelada, corredores largos e permissao sinalizada para cao-guia. A equipe auxilia no deslocamento e na localizacao de produtos quando solicitado.',
    address: 'Rua Harmonia, 420 - Vila Madalena, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    distance: '3,1 km',
    category: 'Mercado',
    position: { lat: -23.557092, lng: -46.690743 },
    features: [feature('ramp'), feature('parking'), feature('guide-dog')],
  },
  {
    id: '4',
    name: 'Espaco Saude Norte',
    description:
      'Clinica com recepcao acessivel, banheiro adaptado e atendimento com suporte para pessoas surdas. Os consultorios ficam em rota direta a partir da entrada principal.',
    address: 'Av. Cruzeiro do Sul, 1800 - Santana, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    distance: '4,8 km',
    category: 'Saude',
    position: { lat: -23.508064, lng: -46.625229 },
    features: [feature('bathroom'), feature('libras'), feature('hearing')],
  },
  {
    id: '5',
    name: 'Hotel Horizonte Livre',
    description:
      'Hotel com elevadores amplos, quartos adaptados e sinalizacao de apoio para pessoas com baixa visao. A recepcao fica no mesmo nivel da calcada e oferece orientacao de chegada.',
    address: 'Alameda Santos, 980 - Jardins, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    distance: '1,8 km',
    category: 'Hotel',
    position: { lat: -23.566216, lng: -46.653423 },
    features: [feature('elevator'), feature('bathroom'), feature('visual'), feature('tactile-floor')],
  },
  {
    id: '6',
    name: 'Restaurante Mesa Aberta',
    description:
      'Restaurante casual com mesas redistribuidas para facilitar circulacao, entrada com rampa e equipe treinada para comunicacao clara. Aceita cao-guia em todos os ambientes.',
    address: 'Rua dos Pinheiros, 650 - Pinheiros, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
    distance: '2,9 km',
    category: 'Restaurante',
    position: { lat: -23.565854, lng: -46.685898 },
    features: [feature('ramp'), feature('guide-dog'), feature('hearing')],
  },
  {
    id: '7',
    name: 'Cinema Luz Compartilhada',
    description:
      'Cinema com elevador, assentos reservados, sessoes com recursos de acessibilidade e apoio visual. A area de espera tem circulacao livre e sinalizacao de facil leitura.',
    address: 'Av. Reboucas, 3970 - Pinheiros, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    distance: '5,3 km',
    category: 'Entretenimento',
    position: { lat: -23.572865, lng: -46.696597 },
    features: [feature('elevator'), feature('libras'), feature('visual'), feature('tactile-floor')],
  },
  {
    id: '8',
    name: 'Parque Jardim Sensorial',
    description:
      'Parque urbano com trilhas acessiveis, percurso sensorial, placas em Braille e areas de descanso proximas aos acessos principais. O local e indicado para lazer ao ar livre com autonomia.',
    address: 'Av. Pedro Alvares Cabral - Ibirapuera, Sao Paulo',
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    distance: '6,1 km',
    category: 'Lazer',
    position: { lat: -23.587416, lng: -46.657634 },
    features: [feature('ramp'), feature('braille'), feature('guide-dog'), feature('tactile-floor')],
  },
]

export const bottomNavigationItems = [
  { id: 'home', label: 'Home', icon: Home, href: '#home' },
  { id: 'community', label: 'Comunidade', icon: MessageCircle, href: '#comunidade' },
  { id: 'profile', label: 'Perfil', icon: User, href: '#perfil' },
  { id: 'settings', label: 'Configuracoes', icon: Settings, href: '#configuracoes' },
]
