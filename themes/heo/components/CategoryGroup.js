import SmartLink from '@/components/SmartLink'

const CategoryGroup = ({ currentCategory, categories = [] }) => {
  if (!categories || categories.length === 0) {
    return <></>
  }

  return (
    <div id='category-list' className='space-y-1'>
      {categories.map(category => {
        let normalizedCategory = currentCategory
        try {
          normalizedCategory = decodeURIComponent(currentCategory)
        } catch (error) {
          normalizedCategory = currentCategory
        }
        const selected = normalizedCategory === category.name
        return (
          <SmartLink
            key={category.name}
            href={`/category/${encodeURIComponent(category.name)}`}
            passHref
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
              selected
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
            }`}>
            <span className='flex items-center gap-2'>
              <i
                className={`text-xs fas ${
                  selected ? 'fa-folder-open text-blue-500' : 'fa-folder text-slate-400'
                }`}
              />
              {category.name}
            </span>
            <span className='text-xs'>{category.count}</span>
          </SmartLink>
        )
      })}
    </div>
  )
}

export default CategoryGroup
