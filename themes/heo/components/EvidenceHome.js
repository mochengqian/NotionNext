import SmartLink from '@/components/SmartLink'
import {
  buildEvidenceHighlights,
  buildSeriesEntries
} from '../evidence.helpers'
import EVIDENCE_CONFIG from '../evidence.config'
import Card from './Card'

const SectionHeader = ({ title, description }) => {
  return (
    <div className='mb-4 px-1'>
      <div className='text-xs uppercase tracking-[0.16em] text-slate-500'>
        首页结构
      </div>
      <h2 className='mt-1 text-2xl font-semibold text-slate-900'>{title}</h2>
      {description && (
        <p className='mt-2 max-w-3xl text-sm leading-6 text-slate-600'>
          {description}
        </p>
      )}
    </div>
  )
}

const LinkCard = ({ item, emphasize = false }) => {
  const cardClassName = emphasize
    ? 'border-slate-200 bg-white shadow-sm hover:border-indigo-600 hover:shadow-md'
    : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'

  const content = (
    <Card
      className={`h-full transition-all duration-200 ${cardClassName}`}
      headerSlot={
        <div className='mb-3 flex items-center justify-between gap-3'>
          {item.label ? (
            <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600'>
              {item.label}
            </span>
          ) : (
            <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600'>
              入口
            </span>
          )}
          {item.meta && (
            <span className='text-xs text-slate-400'>{item.meta}</span>
          )}
        </div>
      }>
      <div className='space-y-3'>
        <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
        {item.summary && (
          <p className='text-sm leading-6 text-slate-600'>{item.summary}</p>
        )}
        <div className='text-sm font-medium text-indigo-600'>
          {item.href ? '进入阅读' : '内容将补充到这里'}
        </div>
      </div>
    </Card>
  )

  if (!item.href) {
    return <div className='h-full'>{content}</div>
  }

  return (
    <SmartLink
      href={item.href}
      target={item.target}
      className='block h-full rounded-xl'>
      {content}
    </SmartLink>
  )
}

export default function EvidenceHome({ allNavPages = [] }) {
  const highlightItems = buildEvidenceHighlights(allNavPages)
  const seriesEntries = buildSeriesEntries(allNavPages)

  return (
    <div className='mb-8 space-y-8'>
      <section>
        <SectionHeader
          title='从这里开始'
          description='先走招聘阅读路径，再回到按时间更新的文章流。首页不再把注意力交给泛推荐，而是交给最该先读的入口。'
        />
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {EVIDENCE_CONFIG.startCards.map(card => (
            <LinkCard key={card.title} item={card} emphasize />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title='证据精选'
          description='优先展示可被复现、复盘或评审的内容。真实文章尚未命中时，会先给出稳定入口，后续补文后会自然替换为代表作。'
        />
        <div className='grid grid-cols-1 gap-4 2xl:grid-cols-2'>
          {highlightItems.map(item => (
            <LinkCard key={`${item.label}-${item.title}`} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title='系列入口'
          description='围绕长期主题骨架持续补文。即使文章数量还不多，也先把阅读路径和主题边界建立起来。'
        />
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {seriesEntries.map(entry => (
            <LinkCard
              key={entry.id}
              item={{
                title: entry.title,
                href: entry.href,
                summary: entry.summary,
                meta: entry.meta
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
