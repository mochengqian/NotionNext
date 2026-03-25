import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { siteInfo } = props

  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div className='flex cursor-pointer items-center gap-3'>
        <LazyImage
          src={siteInfo?.icon}
          width={32}
          height={32}
          alt={siteConfig('AUTHOR')}
          className='hidden rounded-lg border border-slate-200 object-cover md:block'
        />

        <div>
          <div className='text-base font-semibold text-slate-900'>
            {siteConfig('TITLE')}
          </div>
          <div className='hidden text-[11px] uppercase tracking-[0.14em] text-slate-500 md:block'>
            {siteConfig('BIO')}
          </div>
        </div>
      </div>
    </SmartLink>
  )
}

export default Logo
