import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * Category filter strip above post list
 */
export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  const categoryBarItemsRef = useRef(null)

  const handleToggleScroll = () => {
    if (!categoryBarItemsRef.current) return

    const { scrollWidth, clientWidth } = categoryBarItemsRef.current
    categoryBarItemsRef.current.scrollLeft = scrollRight
      ? 0
      : scrollWidth - clientWidth
    setScrollRight(!scrollRight)
  }

  return (
    <div
      id='category-bar'
      className={`wow fadeInUp mb-5 flex flex-nowrap items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 ${
        border ? 'border border-slate-200' : ''
      }`}>
      <div
        id='category-bar-items'
        ref={categoryBarItemsRef}
        className='scroll-hidden scroll-smooth flex max-w-4xl flex-nowrap items-center overflow-x-scroll'>
        <MenuItem href='/' name={locale.NAV.INDEX} isHome />
        {categoryOptions?.map((category, index) => (
          <MenuItem
            key={`${category.name}-${index}`}
            href={`/category/${encodeURIComponent(category.name)}`}
            name={category.name}
          />
        ))}
      </div>

      <div id='category-bar-next' className='flex items-center justify-center gap-2'>
        <button
          type='button'
          className='flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900'
          onClick={handleToggleScroll}>
          {scrollRight ? (
            <ChevronDoubleLeft className='h-4 w-4' />
          ) : (
            <ChevronDoubleRight className='h-4 w-4' />
          )}
        </button>

        <SmartLink
          href='/category'
          className='whitespace-nowrap rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600'>
          {locale.MENU.CATEGORY}
        </SmartLink>
      </div>
    </div>
  )
}

const MenuItem = ({ href, name, isHome = false }) => {
  const router = useRouter()
  const rawCategory =
    typeof router.query?.category === 'string' ? router.query.category : ''

  let currentCategory = rawCategory
  try {
    currentCategory = decodeURIComponent(rawCategory)
  } catch (error) {
    currentCategory = rawCategory
  }

  const isHomePath = router.asPath === '/'
  const selected = isHome ? isHomePath : currentCategory === name

  return (
    <SmartLink
      href={href}
      className={`mr-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
        selected
          ? 'border border-blue-200 bg-blue-50 font-medium text-blue-700'
          : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900'
      }`}>
      {name}
    </SmartLink>
  )
}
