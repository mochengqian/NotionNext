import { siteConfig } from '@/lib/config'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import ReadingProgress from './ReadingProgress'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'

/**
 * Top navigation
 */
const Header = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)

  const router = useRouter()
  const slideOverRef = useRef()

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  useEffect(() => {
    const scrollTrigger = throttle(() => {
      const scrollS = window.scrollY
      if (scrollS <= 1) {
        setFixedNav(false)
        setBgWhite(false)
      } else {
        setFixedNav(true)
        setBgWhite(true)
      }
    }, 100)

    scrollTrigger()
    window.addEventListener('scroll', scrollTrigger)

    return () => {
      window.removeEventListener('scroll', scrollTrigger)
      scrollTrigger.cancel()
    }
  }, [router.asPath])

  const showThemeSwitch = String(siteConfig('THEME_SWITCH')) === 'true'

  return (
    <>
      {fixedNav && <div className='h-16' />}

      <nav
        id='nav'
        className={`top-0 z-30 h-16 w-full transition-all duration-300 ${
          fixedNav ? 'fixed' : 'relative bg-transparent'
        } ${
          navBgWhite
            ? 'border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur'
            : 'text-slate-900'
        }`}>
        <div className='mx-auto flex h-full max-w-[86rem] items-center justify-between px-6'>
          <Logo {...props} />

          <div className='hidden lg:flex flex-1 justify-center'>
            <MenuListTop {...props} />
          </div>

          <div className='flex items-center justify-end gap-1'>
            <SearchButton {...props} />
            {!showThemeSwitch && (
              <div className='hidden md:block'>
                <DarkModeButton {...props} />
              </div>
            )}
            <ReadingProgress />

            <button
              type='button'
              onClick={toggleMenuOpen}
              className='flex h-8 w-8 items-center justify-center lg:hidden'>
              <i className='fas fa-bars' />
            </button>
          </div>

          <SlideOver cRef={slideOverRef} {...props} />
        </div>
      </nav>
    </>
  )
}

export default Header
