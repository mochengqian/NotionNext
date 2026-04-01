import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 顶部英雄区
 * 左侧：定位、关键词、主入口
 * 右侧：阅读路径说明
 */
const Hero = () => {
  const reverse = siteConfig('HEO_HERO_REVERSE', false, CONFIG)

  return (
    <div
      id='hero-wrapper'
      className='recent-top-post-group w-full overflow-hidden select-none px-5 mb-4'>
      <div
        id='hero'
        style={{ zIndex: 1 }}
        className={`${reverse ? 'xl:flex-row-reverse' : ''}
          recent-post-top rounded-[12px] 2xl:px-5 recent-top-post-group max-w-[86rem] w-full mx-auto flex flex-col gap-3 xl:flex-row relative`}>
        <PrimaryPanel />
        <SecondaryPanel />
      </div>
    </div>
  )
}

function PrimaryPanel() {
  const statement = siteConfig('HEO_HERO_STATEMENT', '', CONFIG)
  const keywords = siteConfig('HEO_HERO_KEYWORDS', [], CONFIG)
  const actions = siteConfig('HEO_HERO_ACTIONS', [], CONFIG)

  return (
    <div className='flex min-h-[22rem] flex-1 flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e]'>
      <div className='max-w-4xl'>
        <div className='text-xs uppercase tracking-[0.2em] text-slate-500'>
          首页入口
        </div>
        <h1 className='mt-4 max-w-4xl text-2xl font-semibold leading-10 text-slate-900 dark:text-white md:text-4xl md:leading-[3.5rem]'>
          {statement}
        </h1>

        <div className='mt-5 flex flex-wrap gap-2'>
          {keywords.map(keyword => (
            <span
              key={keyword}
              className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600 dark:border-gray-600 dark:bg-[#25242b] dark:text-gray-300'>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-8 flex flex-wrap gap-3'>
        {actions.map(action => (
          <SmartLink
            key={action.title}
            href={action.href}
            target={action.target}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              action.variant === 'primary'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : action.variant === 'ghost'
                  ? 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
            }`}>
            {action.title}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function SecondaryPanel() {
  const panelTitle = siteConfig('HEO_HERO_PANEL_TITLE', '', CONFIG)
  const panelPoints = siteConfig('HEO_HERO_PANEL_POINTS', [], CONFIG)

  return (
    <div className='w-full shrink-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e] xl:w-[24rem]'>
      <div className='text-xs uppercase tracking-[0.18em] text-slate-500'>
        阅读路径
      </div>
      <h2 className='mt-2 text-2xl font-semibold text-slate-900 dark:text-white'>
        {panelTitle}
      </h2>

      <div className='mt-5 space-y-3'>
        {panelPoints.map((point, index) => (
          <div
            key={point.title}
            className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-gray-700 dark:bg-[#25242b]'>
            <div className='flex items-center gap-3'>
              <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white'>
                {index + 1}
              </div>
              <div className='text-base font-semibold text-slate-900 dark:text-white'>
                {point.title}
              </div>
            </div>
            <p className='mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300'>
              {point.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
