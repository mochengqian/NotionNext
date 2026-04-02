import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import EVIDENCE_CONFIG from '../evidence.config'
import { resolveActiveContentTab } from '../evidence.helpers'

export default function ContentTabs(props) {
  const router = useRouter()
  const activeTab = resolveActiveContentTab({
    pathname: router.pathname,
    category: props.category,
    tag: props.tag || router.query?.tag
  })

  return (
    <div className='mb-3 px-5 md:px-0'>
      <div className='mx-auto max-w-[86rem] overflow-x-auto scroll-hidden'>
        <div className='flex min-w-max items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm dark:border-gray-700 dark:bg-[#1e1e1e]'>
          {EVIDENCE_CONFIG.contentTabs.map(tab => {
            const selected = activeTab === tab.id

            return (
              <SmartLink
                key={tab.id}
                href={tab.href}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-[#25242b] dark:hover:text-white'
                }`}>
                {tab.title}
              </SmartLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
