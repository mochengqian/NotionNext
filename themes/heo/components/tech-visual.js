const PALETTES = [
  {
    accent: '#3b82f6',
    glow: '#60a5fa',
    bgStart: '#050813',
    bgEnd: '#0f172a'
  },
  {
    accent: '#2563eb',
    glow: '#38bdf8',
    bgStart: '#060c1a',
    bgEnd: '#111827'
  },
  {
    accent: '#1d4ed8',
    glow: '#0ea5e9',
    bgStart: '#020617',
    bgEnd: '#0b1120'
  }
]

const CATEGORY_META = {
  '技术': {
    icon: 'fa-solid fa-microchip',
    label: 'Engineering',
    accent: '#3b82f6'
  },
  '生活': {
    icon: 'fa-solid fa-compass-drafting',
    label: 'Life Notes',
    accent: '#2563eb'
  },
  '随笔': {
    icon: 'fa-solid fa-pen-nib',
    label: 'Essays',
    accent: '#1d4ed8'
  },
  default: {
    icon: 'fa-solid fa-folder-tree',
    label: 'Category',
    accent: '#3b82f6'
  }
}

function hashString(input = '') {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function escapeXML(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function getCategoryMeta(categoryName = '') {
  return CATEGORY_META[categoryName] || CATEGORY_META.default
}

export function getTechCoverBySeed(seed = 'notionnext', options = {}) {
  const { label = 'GO / BACKEND / SYSTEM DESIGN' } = options
  const palette = PALETTES[hashString(seed) % PALETTES.length]
  const safeLabel = escapeXML(String(label).slice(0, 42).toUpperCase())
  const gridShift = 8 + (hashString(seed + 'grid') % 24)
  const circleX = 180 + (hashString(seed + 'x') % 1040)
  const circleY = 120 + (hashString(seed + 'y') % 460)

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' width='1600' height='900'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${palette.bgStart}' />
        <stop offset='100%' stop-color='${palette.bgEnd}' />
      </linearGradient>
      <linearGradient id='line' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0%' stop-color='${palette.accent}' stop-opacity='0.1' />
        <stop offset='50%' stop-color='${palette.accent}' stop-opacity='0.9' />
        <stop offset='100%' stop-color='${palette.accent}' stop-opacity='0.1' />
      </linearGradient>
      <radialGradient id='glow' cx='50%' cy='50%' r='50%'>
        <stop offset='0%' stop-color='${palette.glow}' stop-opacity='0.45' />
        <stop offset='100%' stop-color='${palette.glow}' stop-opacity='0' />
      </radialGradient>
      <pattern id='grid' width='56' height='56' patternUnits='userSpaceOnUse'>
        <path d='M 56 0 L 0 0 0 56' fill='none' stroke='${palette.accent}' stroke-opacity='0.13' stroke-width='1' />
      </pattern>
    </defs>
    <rect width='1600' height='900' fill='url(#bg)' />
    <rect width='1600' height='900' fill='url(#grid)' transform='translate(${gridShift}, ${gridShift})' />
    <circle cx='${circleX}' cy='${circleY}' r='360' fill='url(#glow)' />
    <circle cx='1320' cy='720' r='280' fill='url(#glow)' />
    <rect x='120' y='170' width='1360' height='2' fill='url(#line)' />
    <rect x='120' y='730' width='1360' height='2' fill='url(#line)' />
    <text x='120' y='800' font-family='IBM Plex Sans, Segoe UI, Arial, sans-serif' font-size='46' font-weight='700' fill='${palette.glow}' letter-spacing='1'>${safeLabel}</text>
  </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export function getUnifiedPostCover(post = {}, fallbackSeed = 'notionnext') {
  if (post?.pageCoverThumbnail) {
    return post.pageCoverThumbnail
  }

  if (post?.pageCover) {
    return post.pageCover
  }

  const seed =
    post?.id ||
    post?.slug ||
    post?.title ||
    fallbackSeed

  const category = post?.category || ''
  const tag = Array.isArray(post?.tags) && post.tags.length ? post.tags[0] : ''
  const label = [category, tag].filter(Boolean).join(' / ') || 'GO / BACKEND / SYSTEM DESIGN'

  return getTechCoverBySeed(String(seed), { label })
}
