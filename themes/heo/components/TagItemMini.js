import { HashTag } from '@/components/HeroIcons'
import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag?.name}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={`inline-flex cursor-pointer items-center rounded-md border px-2 py-1 text-xs transition-colors ${
        selected
          ? 'border-blue-200 bg-blue-50 text-blue-700'
          : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700'
      }`}>
      <span className='flex items-center gap-1'>
        <HashTag className='h-3 w-3 stroke-2' />
        {tag.name}
      </span>
    </SmartLink>
  )
}

export default TagItemMini
