import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { getStaticPageConfig } from '../evidence.helpers'
import Card from './Card'

const renderCardItem = item => {
  const body = (
    <Card
      className='h-full border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md'
      headerSlot={
        <div className='mb-3 flex items-center justify-between gap-3'>
          <span className='text-xs uppercase tracking-[0.14em] text-slate-500'>
            阅读入口
          </span>
          {item.meta && <span className='text-xs text-slate-400'>{item.meta}</span>}
        </div>
      }>
      <div className='space-y-3'>
        <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
        {item.summary && (
          <p className='text-sm leading-6 text-slate-600'>{item.summary}</p>
        )}
        <div className='text-sm font-medium text-indigo-600'>
          {item.href ? '打开入口' : '内容会继续补充到这里'}
        </div>
      </div>
    </Card>
  )

  if (!item.href) {
    return <div className='h-full'>{body}</div>
  }

  return (
    <SmartLink
      href={item.href}
      target={item.target}
      className='block h-full rounded-xl'>
      {body}
    </SmartLink>
  )
}

const SectionBlock = ({ section }) => {
  if (section.type === 'text') {
    return (
      <Card className='border-slate-200 bg-white shadow-sm'>
        <div className='space-y-4'>
          {section.paragraphs?.map(paragraph => (
            <p key={paragraph} className='text-sm leading-7 text-slate-600'>
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    )
  }

  if (section.type === 'steps') {
    return (
      <Card className='border-slate-200 bg-white shadow-sm'>
        <ol className='space-y-4'>
          {section.items?.map((item, index) => (
            <li key={`${section.id}-${index}`} className='flex gap-4'>
              <div className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700'>
                {index + 1}
              </div>
              <div>
                <div className='text-sm font-semibold text-slate-900'>
                  {item.title || item}
                </div>
                {item.summary && (
                  <p className='mt-1 text-sm leading-6 text-slate-600'>
                    {item.summary}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>
    )
  }

  if (section.type === 'cards') {
    return (
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
        {section.items?.map(item => (
          <div key={`${section.id}-${item.title}`} className='h-full'>
            {renderCardItem(item)}
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default function EvidencePage({ pageKey }) {
  const page = getStaticPageConfig(pageKey)

  if (!page) {
    return null
  }

  const link = siteConfig('LINK')

  return (
    <div className='px-5 md:px-0'>
      <div className='mx-auto max-w-5xl space-y-6'>
        <Card className='border-slate-200 bg-white shadow-sm'>
          <div className='flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between'>
            <div className='max-w-3xl'>
              <div className='text-xs uppercase tracking-[0.18em] text-slate-500'>
                {page.eyebrow}
              </div>
              <h1 className='mt-2 text-3xl font-semibold text-slate-900 md:text-4xl'>
                {page.title}
              </h1>
              <p className='mt-4 text-sm leading-7 text-slate-600 md:text-base'>
                {page.description}
              </p>
            </div>

            {page.actions?.length > 0 && (
              <div className='flex flex-wrap gap-3 xl:justify-end'>
                {page.actions.map(action => (
                  <SmartLink
                    key={`${pageKey}-${action.title}`}
                    href={action.href}
                    target={action.target}
                    className='inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-white sm:w-auto'>
                    {action.title}
                  </SmartLink>
                ))}
                <SmartLink
                  href={link}
                  className='inline-flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:w-auto'>
                  博客首页
                </SmartLink>
              </div>
            )}
          </div>
        </Card>

        {page.sections?.map(section => (
          <section
            key={section.id}
            id={section.id}
            className='scroll-mt-24 space-y-3'>
            <div className='px-1'>
              <div className='text-xs uppercase tracking-[0.16em] text-slate-500'>
                页面区块
              </div>
              <h2 className='mt-1 text-2xl font-semibold text-slate-900'>
                {section.title}
              </h2>
            </div>
            <SectionBlock section={section} />
          </section>
        ))}
      </div>
    </div>
  )
}
