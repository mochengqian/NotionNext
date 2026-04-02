import { useGlobal } from '@/lib/global'

/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return (
    <div className='w-full rounded-xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500 dark:border-gray-700 dark:bg-[#1e1e1e] dark:text-gray-300'>
      <div>{locale.COMMON.NO_MORE}</div>
      {currentSearch && <div className='mt-2 text-xs text-slate-400'>{currentSearch}</div>}
    </div>
  )
}
export default BlogPostListEmpty
