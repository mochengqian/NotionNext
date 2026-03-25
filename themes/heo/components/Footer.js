import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'
/**
 * 页脚
 * @returns
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BEI_AN_LINK = siteConfig('BEI_AN_LINK')
  const BIO = siteConfig('BIO')
  return (
    <footer className='relative m-auto flex w-full flex-shrink-0 justify-center bg-white text-center text-sm leading-6 text-slate-600'>
      {/* 颜色过度区 */}
      <div
        id='color-transition'
        className='h-24 bg-gradient-to-b from-[#f3f5f8] to-white'
      />

      {/* 社交按钮 */}
      <div className='w-full h-24'>
        <SocialButton />
      </div>

      <br />

      {/* 底部页面信息 */}
      <div
        id='footer-bottom'
        className='flex h-20 w-full flex-col items-center justify-between border-t border-slate-200 bg-slate-50 p-3 px-6 lg:flex-row'>
        <div id='footer-bottom-left' className='text-center lg:text-start'>
          <PoweredBy />
          <div className='flex gap-x-1'>
            <CopyRightDate />
            <a
              href={'/about'}
              className='font-semibold underline'>
              {siteConfig('AUTHOR')}
            </a>
            {BIO && <span className='mx-1'> | {BIO}</span>}
          </div>
        </div>

        <div id='footer-bottom-right'>
          {BEI_AN && (
            <>
              <i className='fas fa-shield-alt' />{' '}
              <a href={BEI_AN_LINK} className='mr-2'>
                {siteConfig('BEI_AN')}
              </a>
            </>
          )}
          <BeiAnGongAn />

          <span className='hidden busuanzi_container_site_pv'>
            <i className='fas fa-eye' />
            <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
          </span>
          <span className='pl-2 hidden busuanzi_container_site_uv'>
            <i className='fas fa-users' />{' '}
            <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
          </span>

          {/* <h1 className='text-xs pt-4 text-light-400 dark:text-gray-400'>{title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}</h1> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
