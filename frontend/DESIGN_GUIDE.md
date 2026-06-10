# GEOACESSO - DESIGN GUIDE v1.0

## Objetivo

O GeoAcesso é uma plataforma para localizar estabelecimentos acessíveis para pessoas com deficiência.

O sistema deve transmitir:

* Inclusão
* Modernidade
* Simplicidade
* Confiabilidade
* Facilidade de navegação

Referências visuais:

* Airbnb
* Google Maps
* Booking
* Uber

---

# Identidade Visual

## Estilo

Dark Theme predominante.

Visual minimalista.

Interface baseada em cards.

Espaçamentos generosos.

Pouco uso de bordas.

Ênfase em contraste e acessibilidade.

---

# Paleta de Cores

## Fundo Principal

#111827

Usar em:

* Body
* Navbar
* Footer
* Background geral

---

## Fundo Secundário

#1F2937

Usar em:

* Sidebars
* Containers
* Seções secundárias

---

## Cards

#374151

Usar em:

* Cards de estabelecimentos
* Cards de perfil
* Cards de comunidade

---

## Cor Primária

#3357A8

Usar em:

* Links
* Elementos ativos
* Destaques visuais

---

## Cor Primária Hover

#5974D1

Usar em:

* Hover de links
* Hover de elementos ativos

---

## Cor de Destaque

#E4C31A

Usar em:

* Botões principais
* Filtros ativos
* Badges
* Elementos importantes

---

## Cor de Destaque Hover

#F5D742

Usar em:

* Hover dos botões

---

# Tipografia

Fonte Principal:

Inter

Fallback:

sans-serif

Importação:

https://fonts.google.com/specimen/Inter

---

# Textos

## Texto Principal

#FFFFFF

Peso:

500 ou 600

---

## Texto Secundário

#D1D5DB

Peso:

400

---

## Texto Desabilitado

#9CA3AF

---

# Ícones

Biblioteca:

lucide-react

Instalação:

npm install lucide-react

Tamanho padrão:

24px

Cor padrão:

#FFFFFF

Cor ativa:

#E4C31A

---

# Border Radius

Botões:

12px

Inputs:

12px

Cards:

16px

Modais:

20px

---

# Sombras

Leves.

Nunca usar sombras pesadas.

Padrão:

shadow-lg

---

# Navbar

Altura:

72px

Estrutura:

[Logo] [SearchBar] [Perfil]

Background:

#111827

Posição:

Fixed Top

---

# SearchBar

Formato inspirado no Airbnb.

Borda arredondada.

Background:

#FFFFFF

Texto:

#111827

Ícone Search:

#3357A8

---

# CategoryBar

Abaixo da SearchBar.

Scroll horizontal no mobile.

Categorias:

* Rampa
* Banheiro Adaptado
* Elevador
* Estacionamento
* Braille
* Libras
* Cão-guia
* Auditiva
* Visual

Ícones Lucide.

---

# Cards de Estabelecimentos

Estrutura:

[Imagem]

[Título]

[Endereço]

[Badges de acessibilidade]

[Botão Ver Detalhes]

Background:

#374151

Radius:

16px

---

# Botão Principal

Background:

#E4C31A

Texto:

#111827

Hover:

#F5D742

Radius:

12px

Font Weight:

600

---

# Botão Secundário

Background:

Transparent

Border:

1px solid #E4C31A

Texto:

#E4C31A

---

# Responsividade

Desktop:

> = 1280px

Grid:

4 colunas

---

Tablet:

768px até 1279px

Grid:

2 colunas

---

Mobile:

< 768px

Grid:

1 coluna

Bottom Navigation obrigatória.

---

# Bottom Navigation Mobile

Itens:

* Home
* Mapa
* Comunidade
* Perfil
* Configurações

Ícone ativo:

#E4C31A

Ícone inativo:

#FFFFFF

Background:

#111827

---

# Acessibilidade

Seguir WCAG.

Contraste mínimo AA.

Navegação por teclado.

Labels em inputs.

Alt text em imagens.

Focus visível.

---

# Estrutura de Componentes

components/

* Header
* SearchBar
* CategoryBar
* EstablishmentCard
* AccessibilityBadge
* BottomNavigation
* UserMenu
* Footer

Todos os componentes devem ser reutilizáveis e responsivos.

Utilizar React + TypeScript + TailwindCSS.
