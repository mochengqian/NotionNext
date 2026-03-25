import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import {
  getCategoryMeta,
  getTechCoverBySeed,
  getUnifiedPostCover
} from './tech-visual'

/**
 * Top hero area
 */
const Hero = props => {
  const { latestPosts = [], allNavPages = [], categoryOptions = [] } = props
  const topPosts = getTopPosts({ latestPosts, allNavPages })
  const heroPosts = (topPosts.length ? topPosts : latestPosts).slice(0, 3)
  const heroCategories = getHeroCategories(categoryOptions)

  return (
    <section id='hero-wrapper' className='w-full overflow-hidden select-none px-5 mb-6'>
      <div
        id='hero'
        className='max-w-[86rem] mx-auto grid gap-4 xl:grid-cols-[1.2fr_1fr]'>
        <HeroBrandPanel categories={heroCategories} />

        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-1'>
          {heroPosts.map((post, index) => (
            <SmartLink
              key={post?.id || `${post?.title || 'hero-post'}-${index}`}
              href={post?.href}
              className='group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
              <div className='aspect-[16/9] overflow-hidden'>
                <LazyImage
                  priority={index === 0}
                  src={getUnifiedPostCover(post, `hero-${index}`)}
                  alt={post?.title}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='p-4'>
                <div className='text-xs font-medium uppercase tracking-[0.18em] text-slate-500'>
                  {post?.category || 'Engineering'}
                </div>
                <h3 className='mt-2 line-clamp-2 text-base font-semibold leading-6 text-slate-900'>
                  {post?.title}
                </h3>
                <div className='mt-3 text-xs text-slate-500'>
                  {post?.publishDay || post?.lastEditedDay || ''}
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroBrandPanel({ categories }) {
  const titleMain = siteConfig('HEO_HERO_TITLE_1', null, CONFIG)
  const titleSub = siteConfig('HEO_HERO_TITLE_2', null, CONFIG)
  const subtitle = siteConfig('HEO_HERO_TITLE_3', null, CONFIG)
  const intro = siteConfig(
    'HEO_HERO_INTRO',
    'Build, Learn, Write. Focused on Go backend engineering and system design.',
    CONFIG
  )

  return (
    <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-7 md:p-10 text-slate-100'>
      <LazyImage
        src={getTechCoverBySeed('hero-brand', {
          label: 'BUILD / LEARN / WRITE'
        })}
        alt='hero-bg'
        className='absolute inset-0 h-full w-full object-cover opacity-45 pointer-events-none'
      />
      <div className='absolute inset-0 bg-gradient-to-br from-slate-950/86 to-slate-900/84' />

      <div className='relative z-10'>
        <div className='text-[11px] uppercase tracking-[0.24em] text-slate-300'>
          Personal Tech Journal
        </div>
        <h1 className='mt-4 text-3xl md:text-5xl font-semibold leading-tight'>
          {titleMain}
          <span className='ml-3 text-blue-300'>{titleSub}</span>
        </h1>
        <p className='mt-4 text-sm md:text-base text-slate-300 max-w-2xl'>{subtitle}</p>
        <p className='mt-3 text-sm text-slate-400 leading-7 max-w-2xl'>{intro}</p>

        <div className='mt-8 flex flex-wrap gap-3'>
          <SmartLink
            href='/archive'
            className='inline-flex items-center rounded-lg border border-blue-300/30 bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-blue-500/30'>
            Latest Posts
          </SmartLink>
          <SmartLink
            href='/category'
            className='inline-flex items-center rounded-lg border border-slate-400/30 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10'>
            Browse Categories
          </SmartLink>
        </div>

        <div className='mt-8 grid gap-3 sm:grid-cols-3'>
          {categories.map(category => {
            const meta = getCategoryMeta(category.title)
            return (
              <SmartLink
                key={category.title}
                href={category.url}
                className='group rounded-xl border border-white/15 bg-white/5 px-4 py-3 transition-all duration-200 hover:border-blue-300/50 hover:bg-white/10'>
                <div className='flex items-center justify-between'>
                  <i className={`${meta.icon} text-xs text-slate-300`} />
                  <span className='text-[11px] text-slate-400'>{category.count}</span>
                </div>
                <div className='mt-2 text-sm font-medium text-slate-100'>{category.title}</div>
                <div className='mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400'>
                  {meta.label}
                </div>
                <div
                  className='mt-3 h-0.5 w-8 rounded-full'
                  style={{ background: meta.accent }}
                />
              </SmartLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Get top posts based on configured tag
 */
function getTopPosts({ latestPosts, allNavPages }) {
  const topTag = siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG)

  if (!topTag || String(topTag).trim() === '') {
    return latestPosts
  }

  const shouldSortByUpdateTime =
    String(
      siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', false, CONFIG)
    ) === 'true'

  const sourcePosts = Array.isArray(allNavPages) ? [...allNavPages] : []
  const sortedPosts = shouldSortByUpdateTime
    ? sourcePosts.sort((a, b) => {
        const dateA = new Date(a?.lastEditedDate)
        const dateB = new Date(b?.lastEditedDate)
        return dateB - dateA
      })
    : sourcePosts

  return sortedPosts.filter(post => post?.tags?.includes(topTag)).slice(0, 6)
}

function getHeroCategories(categoryOptions = []) {
  const categoryMap = new Map(
    categoryOptions.map(item => [item?.name, item?.count || 0])
  )

  const configured = [1, 2, 3]
    .map(index =>
      parseCategoryConfig(siteConfig(`HEO_HERO_CATEGORY_${index}`, {}, CONFIG))
    )
    .filter(item => item.title || item.url)
    .map(item => {
      const title = item.title || getTitleFromCategoryUrl(item.url) || 'Category'
      const fallbackUrl = title
        ? `/category/${encodeURIComponent(title)}`
        : '/category'
      return {
        title,
        url: normalizeCategoryUrl(item.url || fallbackUrl, title),
        count: categoryMap.get(title) || '--'
      }
    })

  if (configured.length > 0) {
    return configured
  }

  return categoryOptions.slice(0, 3).map(item => ({
    title: item.name,
    url: `/category/${encodeURIComponent(item.name)}`,
    count: item.count
  }))
}

function parseCategoryConfig(value) {
  if (!value) return {}
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      return {}
    }
  }
  return value
}

function normalizeCategoryUrl(rawUrl = '', fallbackTitle = '') {
  if (!rawUrl) {
    return fallbackTitle
      ? `/category/${encodeURIComponent(fallbackTitle)}`
      : '/category'
  }

  if (rawUrl.startsWith('/category/')) {
    const categoryName = rawUrl.replace('/category/', '')
    return `/category/${encodeURIComponent(decodeURIComponent(categoryName))}`
  }

  return rawUrl
}

function getTitleFromCategoryUrl(url = '') {
  if (!url.startsWith('/category/')) return ''
  const value = url.replace('/category/', '')
  try {
    return decodeURIComponent(value)
  } catch (error) {
    return value
  }
}

export default Hero
